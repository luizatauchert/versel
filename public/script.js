document.addEventListener("DOMContentLoaded", function () {

  const loginForm = document.getElementById("loginForm");         // Formulário de login
  const cadastroForm = document.getElementById("cadastroForm");   // Formulário de cadastro
  const formulario = document.getElementById("formulario");       // Div que contém o formulário
  const mensagemSucesso = document.getElementById("mensagemSucesso"); // Mensagem de sucesso
  const voltarBtn = document.getElementById("voltarBtn");         // Botão "Voltar" (pode não existir)

  /**
   * Função para processar o login
   * Envia uma requisição POST para /api/login com email e senha
   */
  async function realizarLogin(e) {
    e.preventDefault(); // Evita comportamento padrão do formulário

    const email = document.getElementById("email").value;
    const password = document.getElementById("senha").value;

    try {
      const res = await fetch("http://localhost:3000/api/usersLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })

      });

      if (res.ok) {
        // Sucesso no login
        mensagemSucesso.style.display = "block";
        formulario.style.display = "none";
        setTimeout(() => {
          window.location.href = "telaPrincipal.html"; // Redireciona após sucesso
        }, 1500);
      } else {
        const data = await res.json();
        alert(data.message || "Erro ao fazer login");
      }
    } catch (error) {
      alert("Erro na requisição: " + error.message);
    }
  }

  /**
   * Função para processar o cadastro
   * Envia uma requisição POST para /api/register com nome, email e senha
   */
  async function realizarCadastro(e) {
    e.preventDefault(); // Evita comportamento padrão

    const name = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("senha").value;
    const confirmar = document.getElementById("confirmar").value;

    if (password !== confirmar) {
      alert("As senhas não coincidem.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })

      });

      if (res.ok) {
        mensagemSucesso.style.display = "block";
        formulario.style.display = "none";
        setTimeout(() => {
          window.location.href = "entrar.html"; // Redireciona para a tela de login
        }, 1500);
      } else {
        const data = await res.json();
        alert(data.message || "Erro ao cadastrar");
      }
    } catch (error) {
      alert("Erro na requisição: " + error.message);
    }
  }

  /**
   * Evento para login
   */
  if (loginForm) {
    loginForm.addEventListener("submit", realizarLogin);
  }

  /**
   * Evento para cadastro
   */
  if (cadastroForm) {
    cadastroForm.addEventListener("submit", realizarCadastro);
  }

  /**
   * Evento para botão de voltar (se existir)
   */
  if (voltarBtn) {
    voltarBtn.addEventListener("click", function () {
      mensagemSucesso.style.display = "none";
      formulario.style.display = "block";
      if (loginForm) loginForm.reset();
      if (cadastroForm) cadastroForm.reset();
    });
  }
});
const som = document.getElementById('somPrincesa');
document.addEventListener('click', () => {
  som.muted = false;
  som.play();
});
