window.onload = function() {
  const btnRegister = document.getElementById("btnRegister");
  const aSponsors = document.getElementById("aSponsors");

  aSponsors.addEventListener("click", function() {    
    document.getElementById("sponsors").scrollIntoView({behavior: 'smooth'})
  })

  aSponsors.addEventListener("mouseover", function() {    
    console.log("entrei")
    document.getElementById("aSponsors").style.cursor = "pointer";
  })

  btnRegister.addEventListener("click", function() {
    swal({
      title: "Inscrição na WebConference",
      input: "email",
      inputPlaceholder: "email",
      inputAttributes: {
        autocapitalize: "off"
      },
      showCancelButton: true,
      confirmButtonText: "Inscrever",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      preConfirm: email => {
        return fetch("https://fcawebbook.herokuapp.com/participants", {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: "POST",
          body: JSON.stringify({
            nome: "ricardo",
            email: "ricardo.queiros@gmail.com"
          })
        })
          .then(response => {
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            return response.json();
          })
          .catch(error => {
            swal.showValidationError(`Request failed: ${error}`);
          });
      },
      allowOutsideClick: () => !swal.isLoading()
    }).then(result => {
      if (result.value) {
        swal({
          title: `${result}`
          //imageUrl: result.value.avatar_url
        });
      }
    });
  });
};
