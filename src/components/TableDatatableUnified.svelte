<script>
  export let dataCoinUnified = {};
</script>

<div class="row">
  <div class="col-12">
    <div class="card">
      <div class="card-header">
        <h4 class="card-title">Future</h4>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table id="example3" class="display" style="min-width: 845px">
            <thead>
              <tr>
                <th>No.</th>
                <th>Coin</th>
                <th>Transfer Balance</th>
                <th>Wallet Balance</th>
                <th>Bonus</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {#each dataCoinUnified.balance as coin, index (coin.coin)}
                <tr>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      class="rounded-circle"
                      width="35"
                      src={coin.coin}
                      alt=""
                    />
                    {coin.coin}
                  </td>
                  <td>{coin.transferBalance}</td>
                  <td>{coin.walletBalance}</td>
                  <td>{coin.bonus}</td>
                  <td>
                    <div class="d-flex">
                      <a
                        href="/"
                        class="btn btn-primary shadow btn-xs sharp me-1"
                        ><i class="fas fa-pencil-alt"></i></a
                      >
                      <a href="/" class="btn btn-danger shadow btn-xs sharp"
                        ><i class="fa fa-trash"></i></a
                      >
                    </div>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
