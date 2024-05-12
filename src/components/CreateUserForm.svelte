<script>
  import Swal from "sweetalert2";
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {};
    for (let field of formData) {
      const [key, value] = field;
      data[key] = value;
    }
    try {
      await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(data),
      });
      Swal.fire("Success", "Data successfully inserted", "success").then(
        (result) => {
          if (result.isConfirmed) {
            window.location.href = "/users";
          }
        }
      );
    } catch (error) {
      Swal.fire("Oops...", "We failed to insert the data", "error");
    }
  };

  const onCancel = async () => {
    window.location = "/users";
  };
</script>

<form
  class="form-valide-with-icon needs-validation"
  novalidat
  on:submit={onSubmit}
  method="post"
>
  <div class="mb-3">
    <label class="text-label form-label" for="validationCustomUsername"
      >Username</label
    >
    <div class="input-group">
      <span class="input-group-text">
        <i class="fa fa-user"></i>
      </span>
      <input
        type="text"
        class="form-control"
        name="username"
        id="validationCustomUsername"
        placeholder="Enter a username.."
        required
      />
      <div class="invalid-feedback">Please Enter a username.</div>
    </div>
  </div>
  <div class="mb-3">
    <label class="text-label form-label" for="dz-password">Password *</label>
    <div class="input-group transparent-append">
      <span class="input-group-text">
        <i class="fa fa-lock"></i>
      </span>
      <input
        type="password"
        class="form-control"
        id="dz-password"
        name="password"
        placeholder="Choose a safe one.."
        required
      />
      <span class="input-group-text show-pass">
        <i class="fa fa-eye-slash"></i>
        <i class="fa fa-eye"></i>
      </span>
      <div class="invalid-feedback">Please Enter a password.</div>
    </div>
  </div>
  <button type="submit" class="btn me-2 btn-primary"> Submit </button>
  <button type="button" class="btn btn-danger" on:click={onCancel}>
    Cancel
  </button>
</form>
