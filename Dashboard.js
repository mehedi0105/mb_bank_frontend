const handleDashbord1 =()=>{
    window.location.href = 'http://127.0.0.1:5500/Frontend/Dashbord.html'
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

handleDashbord()