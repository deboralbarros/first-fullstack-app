const submit = document.getElementById("submit");
submit.addEventListener("click", async (evt) => {
  evt.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const passConfirm = document.getElementById("passConfirm").value;
  const gender = document.querySelector("input[name='gender']:checked").value;
  const birthdate = document.getElementById("birthdate").value;

  if (password !== passConfirm) {
    alert("Senhas não correspondem");
  } else {
    const user = new User(name, email, password, gender, birthdate);

    await fetch("/api/user", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user,
      }),
    })
      .then((res) => {
        if (res.status === 201) {
          return "Cadastrado com sucesso";
        } else if (res.status === 409) {
          return "Nome de usuário já está sendo usado";
        }
      })
      .then((res) => {
        alert(res);

        if (res === "Cadastrado com sucesso") {
          location.reload();
        }
      });
  }
});
