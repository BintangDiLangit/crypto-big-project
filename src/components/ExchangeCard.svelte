<script>
  export let balance = 0;
  export let percent = 0;
</script>

<div class="card exchange">
  <div class="card-header d-block border-0 pb-0">
    <h2 class="heading">Your Balance</h2>
  </div>
  <div class="card-body pt-0">
    <div class="balance">
      <div class="header-content">
        <h6 class="text-muted">${balance}</h6>
      </div>
      <div class="d-flex justify-content-between align-items-baseline">
        <h4 class="count-num">${balance}</h4>
        {#if percent < 0}
          <span class="fs-14 font-w400 text-danger">
            <i class="bi bi-caret-down-fill pe-2"></i>- {Math.abs(percent)}%
          </span>
        {:else}
          <span class="fs-14 font-w400 text-success">
            <i class="bi bi-caret-up-fill pe-2"></i>+ {percent}%
          </span>
        {/if}
      </div>
    </div>
  </div>
</div>
