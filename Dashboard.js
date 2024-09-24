const handleDashbord1 =()=>{
    window.location.href = 'http://127.0.0.1:5500/Dashboard.html'
  }
  
  const handleDashbord =()=>{
      const parent = document.getElementById("content-area")
      if(parent && parent.innerHTML!==""){
          parent.innerHTML =="";
      }
      parent.innerHTML = `
        <h1>Dashboard</h1>
        <p>We are glad to see you again!</p>
        <div class="row">
          <div class="col-md-6">
            <div class="balance">
              <h2>Balance</h2><br>
              <p id="available-balance"></p><br>
              <h5>available</h5>
            </div>
            <div class="fovorite-transfer">
              <h2>Favourite Transfers</h2>
              <div class="Favourite-user d-flex gap-2 align-item-center w-100">
                <!-- <img src="" alt=""> -->
                <i class="fa-solid fa-user"></i>
                <p>Mehedi Hasan</p>
              </div>
              <div class="Favourite-user d-flex gap-2 align-item-center w-100">
                <!-- <img src="" alt=""> -->
                <i class="fa-solid fa-user"></i>
                <p>Mehedi Hasan</p>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="insights">
              <img src="./images/Dashbord Sample.png"  class="img-fluid" alt="">
            </div>
          </div>
        </div>
        <h3>Transaction</h3>
      <table class="table">
        <thead class="table-dark">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Type</th>
            <th scope="col">Status</th>
            <th scope="col">Amount</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody id="main-tbody">
  
        </tbody>
      </table>
      `
}

const available_balance = () => {
  
  const parent = document.getElementById("available-balance");
  const Id = localStorage.getItem("id");
  console.log(Id)
  
  if (parent && parent.innerHTML !== "") {
    parent.innerHTML = "";
  }
  
  fetch(`https://mb-bank-b.onrender.com/useraccount/${Id}/`)
    .then((res) => res.json())
    .then((data) => {

        parent.innerHTML = `
          $${data.account_balance} USD
        `
    })
    .catch(error => console.error("Error fetching account data:", error));
  };

  const handleTransactions =()=>{
    const parent = document.getElementById("main-tbody")
    const id = localStorage.getItem('id')
  
    fetch(`https://mb-bank-b.onrender.com/transaction/user_transaction/${id}/`)
      .then((res)=>res.json())
      .then((data)=>{
        data.forEach(async(element) => {
          const tr = document.createElement("tr")
          // const name = await getName(data.account)
          tr.innerHTML = `
            <th scope="row">${element.id}</th>
            <td>Test</td>
            <td>${element.transaction_type}</td>
            <td>${element.transaction_type == "deposit"||element.transaction_type == "withdraw" ? "Complated":"Pending"}</td>
            <td>${element.amount} USD</td>
            <td>${element.date}</td>
          `
          parent.appendChild(tr);
        });
        });

  }

  const hanldeDeposite =()=>{
    const parent = document.getElementById("content-area")
    if(parent && parent.innerHTML!==""){
        parent.innerHTML =="";
    }
    parent.innerHTML = `
    <div class="row">
      <div class="col-md-6">
        <h1>Deposite Form</h1>
        <p>We are glad to see you again!</p>
        <div class="deposite-form w-100">
          <form action="" class="w-100" id="deposite-form" onsubmit="handleDepositeAmount(event)"> 
          <h2 class="w-100 text-center">DEPOSITE FORM</h2>
          <input type="number" id="account_no" name="account_no" class="form-control w-100 p-3 mb-3" placeholder="Enter deposit Account No" required>
          <input type="number" step="0.1" id="amount" name="amount" class="form-control w-100 p-3 mb-3" placeholder="Enter your Deposit Amount" required>
          <button type="submit" class="btn w-100 fw-bold btn-primary">DEPOSITE</button>
          </form>
        </div>
      </div>
      <div class="col-md-6" style="margin-top:30px;">
        <h3 class="tessasd">Transaction</h3>
        <table class="table">
          <thead class="table-dark">
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Type</th>
              <th scope="col">Status</th>
              <th scope="col">Amount</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody id="main-tbody">

          </tbody>
        </table>
      </div>
    </div>

    `
    handleTransactions()

}

const handleDepositeAmount =(event)=>{
  event.preventDefault()
  const form = document.getElementById("deposite-form")
  const form_data = new FormData(form);

  const account_no = form_data.get("account_no");
  const amount = form_data.get("amount");
  const authToken = localStorage.getItem('token');
  const id = localStorage.getItem("id")

  fetch("https://mb-bank-b.onrender.com/transaction/deposit/", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "id":id,
      "amount":amount,
      "account_no":account_no,
    }),
  })
  .then(response => response.json())
  .then(async(data) =>{
    await notifyDeposit()
    window.location.href='./Dashboard.html'
  })
  .catch(error => console.error('Error:', error));

}

const handleTransactionsMain =async()=>{
  const parent = document.getElementById("content-area")
    if(parent && parent.innerHTML!==""){
        parent.innerHTML =="";
    }
    parent.innerHTML = `
    <h3 class="tessasd">Transaction</h3>
    <table class="table">
      <thead class="table-dark">
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Name</th>
          <th scope="col">Type</th>
          <th scope="col">Status</th>
          <th scope="col">Amount</th>
          <th scope="col">Date</th>
        </tr>
      </thead>
      <tbody id="main-tbody">

      </tbody>
    </table>
    `
  await handleTransactions()
}

const hanldeWithdraw =()=>{
  const parent = document.getElementById("content-area")
  if(parent && parent.innerHTML!==""){
      parent.innerHTML =="";
  }
  parent.innerHTML = `
  <div class="row">
    <div class="col-md-6">
      <h1>Withdraw Form</h1>
      <p>We are glad to see you again!</p>
      <div class="deposite-form w-100">
        <form action="" class="w-100" id="deposite-form" onsubmit="handleWithdrawAmount(event)"> 
        <h2 class="w-100 text-center">WITHDRAW FORM</h2>
        <input type="number" id="account_no" name="account_no" class="form-control w-100 p-3 mb-3" placeholder="Enter withdraw Account No" required>
        <input type="number" step="0.1" id="amount" name="amount" class="form-control w-100 p-3 mb-3" placeholder="Enter your withdraw Amount" required>
        <button type="submit" class="btn w-100 fw-bold btn-primary">WITHDRAW</button>
        </form>
      </div>
    </div>
    <div class="col-md-6" style="margin-top:30px;">
      <h3 class="tessasd">Transaction</h3>
      <table class="table">
        <thead class="table-dark">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Type</th>
            <th scope="col">Status</th>
            <th scope="col">Amount</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody id="main-tbody">

        </tbody>
      </table>
    </div>
  </div>

  `
  handleTransactions()

}

const handleWithdrawAmount =(event)=>{
  event.preventDefault()
  const form = document.getElementById("deposite-form")
  const form_data = new FormData(form);

  const account_no = form_data.get("account_no");
  const amount = form_data.get("amount");
  const authToken = localStorage.getItem('token');
  const id = localStorage.getItem("id")

  fetch("https://mb-bank-b.onrender.com/transaction/withdraw/", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "id":id,
      "amount":amount,
      "account_no":account_no,
    }),
  })
  .then(response => response.json())
  .then(async(data) =>{
    await notifyDeposit()
    window.location.href='./Dashboard.html'
  })
  .catch(error => console.error('Error:', error));

}
const hanldeTransferMoney =()=>{
  const parent = document.getElementById("content-area")
  if(parent && parent.innerHTML!==""){
      parent.innerHTML =="";
  }
  parent.innerHTML = `
  <div class="row">
    <div class="col-md-6">
      <h1>Transfer money Form</h1>
      <p>We are glad to see you again!</p>
      <div class="deposite-form w-100">
        <form action="" class="w-100" id="deposite-form" onsubmit="handleTranferMoney(event)"> 
        <h2 class="w-100 text-center">TRANSFER FORM</h2>
        <input type="number" id="account_no" name="account_no" class="form-control w-100 p-3 mb-3" placeholder="Enter recepent Account No" required>
        <input type="number" step="0.1" id="amount" name="amount" class="form-control w-100 p-3 mb-3" placeholder="Enter your transfer Amount" required>
        <button type="submit" class="btn w-100 fw-bold btn-primary">TRANSFER</button>
        </form>
      </div>
    </div>
    <div class="col-md-6" style="margin-top:30px;">
      <h3 class="tessasd">Transaction</h3>
      <table class="table">
        <thead class="table-dark">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Type</th>
            <th scope="col">Status</th>
            <th scope="col">Amount</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody id="main-tbody">

        </tbody>
      </table>
    </div>
  </div>

  `
  handleTransactions()

}

const handleTranferMoney =(event)=>{
  event.preventDefault()
  const form = document.getElementById("deposite-form")
  const form_data = new FormData(form);

  const account_no = form_data.get("account_no");
  const amount = form_data.get("amount");
  const authToken = localStorage.getItem('token');
  const id = localStorage.getItem("id")

  fetch("https://mb-bank-b.onrender.com/transaction/transfer_money/", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "id":id,
      "amount":amount,
      "recipent_account_no":account_no,
    }),
  })
  .then(response => response.json())
  .then(async(data) =>{
    // await notifyDeposit()
    window.location.href='./Dashboard.html'
  })
  .catch(error => console.error('Error:', error));

}

const hanldeLoadrequest =()=>{
  const parent = document.getElementById("content-area")
  if(parent && parent.innerHTML!==""){
      parent.innerHTML =="";
  }
  parent.innerHTML = `
  <div class="row">
    <div class="col-md-6">
      <h1>Loan Request</h1>
      <p>We are glad to see you again!</p>
      <div class="deposite-form w-100">
        <form action="" class="w-100" id="deposite-form" onsubmit="handleWithdrawAmount(event)"> 
        <h2 class="w-100 text-center">LOAN REQUEST</h2>
        <select id="loan-type" name="loan-type" class="form-control w-100 p-3 mb-3" required>
          <option value="" selected>Choose...</option>
          <option value="personal_loan">personal_loan</option>
          <option value="home_loan">home_loan</option>
          <option value="car_loan">car_loan</option>
          <option value="bussiness_loan">bussiness_loan</option>
          <option value="other">other</option>
        </select>
        <input type="number" step="0.1" id="amount" name="amount" class="form-control w-100 p-3 mb-3" placeholder="Enter your Lon Amount" required>
        <button type="submit" class="btn w-100 fw-bold btn-primary">REQUEST LOAN</button>
        </form>
      </div>
    </div>
    <div class="col-md-6" style="margin-top:30px;">
      <h3 class="tessasd">Transaction</h3>
      <table class="table">
        <thead class="table-dark">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Type</th>
            <th scope="col">Status</th>
            <th scope="col">Amount</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody id="main-tbody">

        </tbody>
      </table>
    </div>
  </div>

  `
  handleTransactions()

}

const handleLoan=(event)=>{
  event.preventDefault()
  const form = document.getElementById("deposite-form")
  const form_data = new FormData(form);

  const loan_type = form_data.get("loan_type");
  const amount = form_data.get("amount");
  const authToken = localStorage.getItem('token');
  const id = localStorage.getItem("id")

  fetch("https://mb-bank-b.onrender.com/transaction/loan_request/",{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "id":id,
      "amount":amount,
      "loan_type":loan_type,
      "loan_status":false,
    }),
  })
  .then(response => response.json())
  .then(async(data) =>{
    // await notifyDeposit()
    window.location.href='./Dashboard.html'
  })
  .catch(error => console.error('Error:', error));
}

handleDashbord()
available_balance()
handleTransactions()