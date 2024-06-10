const baseApiUrl = "https://cc0057ba-73b9-4881-9d22-2136c991d8eb-00-2jwqq3dx7jht6.spock.replit.dev/";

var personData;

if (localStorage.getItem("user")) {
    personData = JSON.parse(localStorage.getItem("user"));

    if(personData.tipoUsuario === "promotor" || personData.tipoUsuario === "admin") {
        document.getElementById('myEventsButton').style.display = 'block';
    }
} else {
    window.location = "/codigo/index.html";
}

loadUserInfo();
loadProfileInfo();

function loadUserInfo() {
    const loggedContent = document.getElementById('logged-content');
    if (personData && personData.id) {
        if (personData.tipoUsuario === "promotor" || personData.tipoUsuario === "admin") {
            loggedContent.innerHTML = `<a href="/codigo/pages/create-edit-event.html"> <h1 class="create-event-title">Criar um evento</h1> </a>`;
        }

        document.getElementById('profilePic').innerHTML = personData.foto
            ? `<img src=${personData.foto} alt="Profile Picture" class="profile-pic">`
            : `<div class="profile-pic profile-pic-name">${personData.nome.slice(0, 1)}</div>`;

        const userPhoto = personData.foto
            ? `<img data-bs-toggle="dropdown" src=${personData.foto} alt="Foto do usuário" class="user-photo"></img>`
            : `<div data-bs-toggle="dropdown" class="user-photo">${personData.nome.slice(0, 1)}</div>`;

        loggedContent.innerHTML += `
        <div class="dropdown">
            ${userPhoto}
            <ul class="dropdown-menu">
                ${personData.tipoUsuario === "promotor" || personData.tipoUsuario === "admin" ? '<li><a class="dropdown-item" href="/codigo/pages/create-edit-event.html">Criar evento</a></li>' : ''}
                <li style="cursor: pointer;" class="dropdown-item" onClick="logout()">Sair</li>
            </ul>
        </div>`;
    } else {
        loggedContent.innerHTML = `<a href="/codigo/pages/login.html"><button class="sign-in-button">Entrar / Cadastrar</button></a>`;
    }
}

function loadProfileInfo() {
    document.getElementById('event-name').value = personData.nome;
    document.getElementById('city').value = personData.cidade;
    document.getElementById('email').value = personData.email;
    document.getElementById('interests').value = personData.interesses;
    document.getElementById('divName').style.display = 'inline-block';
    document.getElementById('divCity').style.display = 'inline-block';
    document.getElementById('divEmail').style.display = 'inline-block';
    document.getElementById('divInterests').style.display = 'inline-block';
    document.getElementById('saveMyProfile').style.display = 'none';
    document.getElementById('saveMyPassword').style.display = 'none';
}

document.getElementById('editMyProfile').addEventListener('click', editProfile);

function editProfile() {
    document.getElementById('event-name').disabled = false;
    document.getElementById('city').disabled = false;
    //document.getElementById('email').disabled = false;
    document.getElementById('interests').disabled = false;
    document.getElementById('saveMyProfile').style.display = 'inline-block';
    document.getElementById('saveMyPassword').style.display = 'none';
}

document.getElementById('editMyPassword').addEventListener('click', editPassword);

function editPassword() {
    document.getElementById('divName').style.display = 'none';
    document.getElementById('divCity').style.display = 'none';
    document.getElementById('divEmail').style.display = 'none';
    document.getElementById('divInterests').style.display = 'none';
    document.getElementById('divPassword').style.display = 'inline-block';
    document.getElementById('divNewPassword').style.display = 'inline-block';
    document.getElementById('divNewPasswordconfirm').style.display = 'inline-block';
    document.getElementById('saveMyPassword').style.display = 'inline-block';
}

document.getElementById('saveMyProfile').addEventListener('click', saveProfile);

function saveProfile() {
    personData.nome = document.getElementById('event-name').value;
    personData.cidade = document.getElementById('city').value;
    //personData.email = document.getElementById('email').value;
    personData.interesses = document.getElementById('interests').value;
    //personData.password = document.getElementById('password').value;

    localStorage.setItem('user', JSON.stringify(personData));
    alert('Salvo!');

    document.getElementById('event-name').disabled = true;
    document.getElementById('city').disabled = true;
    document.getElementById('email').disabled = true;
    document.getElementById('interests').disabled = true;
    //document.getElementById('password').disabled = true;
    document.getElementById('divName').style.display = 'inline-block';
    document.getElementById('divCity').style.display = 'inline-block';
    document.getElementById('divEmail').style.display = 'inline-block';
    document.getElementById('divInterests').style.display = 'inline-block';
    //document.getElementById('divPassword').style.display = 'none';
    //document.getElementById('divNewPassword').style.display = 'none';
    //document.getElementById('divNewPasswordconfirm').style.display = 'none';
    document.getElementById('saveMyProfile').style.display = 'none';
}

document.getElementById('saveMyPassword').addEventListener('click', savePassword);

function savePassword() {
    var senhaAtualJS = personData.password;
    var senhaAtualDig = document.getElementById('password').value;
    var senhaNova = document.getElementById('newPassword').value;
    var senhaNovaConfirmacao = document.getElementById('newPasswordconfirm').value;

    if (senhaAtualJS === senhaAtualDig) {
        if (senhaNova && senhaNova === senhaNovaConfirmacao) {
            personData.password = senhaNova;
            localStorage.setItem('user', JSON.stringify(personData));
            alert('Senha alterada com sucesso!');
            window.location.href = 'profile.html'; // Redireciona para profile.html
        } else {
            alert('Nova senha e confirmação não correspondem ou estão vazias.');
        }
    } else {
        alert('Credenciais inválidas');
    }
    document.getElementById('saveMyPassword').style.display = 'none';
}

function logout() {
    localStorage.removeItem("user");
    window.location.reload();
}