import { api } from '../utils/api.js';

import { setToken } from '../utils/auth.js';

import { navigateTo } from '../router.js';

import { toast } from '../utils/dom.js';


const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


// Renders the login/register screen (the project's visual source of truth).
// `mode` is 'login' or 'register'.
export function renderAuth(mode) {

  return (params, app) => {

    let current = mode;


    app.innerHTML = `

      <div class="auth-wrap">

        <aside class="auth-aside grid-bg">

          <div class="auth-glow"></div>

          <div class="auth-brand">devtrack</div>

          <div class="auth-hero">

            <h1>Your progress<br/>as a <span>developer</span>,<br/>visualized.</h1>

            <p>Track your skills, projects, and study hours. Earn badges. See how you grow.</p>

            <div class="auth-progress">

              <div style="display:flex;justify-content:space-between;font-size:12px;color:#94a3b8;margin-bottom:8px;">

                <span>JavaScript · Advanced</span><span>72%</span>

              </div>

              <div class="bar"><div class="fill"></div></div>

            </div>

          </div>

        </aside>


        <section class="auth-section">

          <div class="auth-card">

            <div class="auth-toggle">

              <div id="toggle-pill" class="pill"></div>

              <button data-mode="login">Login</button>

              <button data-mode="register">Register</button>

            </div>

            <div id="form-container"></div>

          </div>

        </section>

      </div>

    `;


    const container = document.getElementById('form-container');


    const setMode = (next) => {

      current = next;

      history.replaceState({}, '', next === 'login' ? '/login' : '/register');

      updateToggle();

      renderForm();

    };


    const updateToggle = () => {

      const pill = document.getElementById('toggle-pill');

      pill.style.transform = current === 'login' ? 'translateX(0)' : 'translateX(100%)';

      app.querySelectorAll('[data-mode]').forEach((btn) => {

        btn.style.color = btn.dataset.mode === current ? '#ffffff' : '#94a3b8';

      });

    };


    const field = (name, label, type, placeholder, order) => `

      <div class="fade-in-up" style="animation-delay:${order * 80}ms">

        <label class="f-label" style="margin-bottom:4px;display:block;">${label}</label>

        <input name="${name}" type="${type}" placeholder="${placeholder}" class="input-line" autocomplete="off" />

        <p class="text-xs form-error hidden" data-error-for="${name}" style="font-size:12px;margin-top:4px;"></p>

      </div>

    `;


    const renderForm = () => {

      const isLogin = current === 'login';

      container.innerHTML = `

        <div style="margin-bottom:1.5rem;">

          <h2 class="fade-in-up" style="font-size:1.5rem;font-weight:800;color:#0f172a;">${

            isLogin ? 'Welcome back' : 'Create your account'

          }</h2>

          <p class="fade-in-up" style="font-size:14px;color:#64748b;margin-top:4px;animation-delay:60ms;">${

            isLogin ? 'Enter your details to continue.' : 'Start tracking your progress today.'

          }</p>

        </div>


        <form id="auth-form" novalidate style="display:flex;flex-direction:column;gap:1.25rem;">

          ${isLogin ? '' : field('full_name', 'Full name', 'text', 'Your name', 1)}

          ${isLogin ? '' : field('username', 'Username', 'text', 'your_username', 2)}

          ${field('email', 'Email', 'email', 'youremail@example.com', isLogin ? 1 : 3)}

          ${field('password', 'Password', 'password', 'Minimum 8 characters', isLogin ? 2 : 4)}

          ${isLogin ? '' : field('confirm', 'Confirm password', 'password', 'Repeat your password', 5)}

          <p id="form-error" class="form-error hidden"></p>

          <button type="submit" id="submit-btn" class="btn-primary fade-in-up" style="width:100%;animation-delay:300ms;">

            <span id="btn-label">${isLogin ? 'Log in' : 'Create account'}</span>

          </button>

        </form>

      `;

      document.getElementById('auth-form').addEventListener('submit', submit);

    };


    const showErrors = (errors) => {

      app.querySelectorAll('[data-error-for]').forEach((el) => {

        const key = el.dataset.errorFor;

        if (errors[key]) {

          el.textContent = errors[key];

          el.classList.remove('hidden');

          const input = app.querySelector(`input[name="${key}"]`);

          input.classList.remove('shake');

          void input.offsetWidth;

          input.classList.add('shake');

        } else {

          el.classList.add('hidden');

        }

      });

    };


    const validate = (values) => {

      const errors = {};

      const isLogin = current === 'login';

      if (!isLogin && !values.full_name) errors.full_name = 'Name is required';

      if (!isLogin && !values.username) errors.username = 'Username is required';

      if (!values.email) errors.email = 'Email is required';

      else if (!emailRegex.test(values.email)) errors.email = 'Invalid email format';

      if (!values.password) errors.password = 'Password is required';

      else if (values.password.length < 8) errors.password = 'Minimum 8 characters';

      if (!isLogin && values.confirm !== values.password)

        errors.confirm = 'Passwords do not match';

      return errors;

    };


    const submit = async (event) => {

      event.preventDefault();

      const form = event.target;

      const values = Object.fromEntries(new FormData(form).entries());

      const errors = validate(values);

      showErrors(errors);

      if (Object.keys(errors).length > 0) return;


      const btn = document.getElementById('submit-btn');

      const label = document.getElementById('btn-label');

      const original = label.textContent;

      btn.disabled = true;

      label.innerHTML = '<span class="spinner"></span> Sending...';


      try {

        if (current === 'register') {

          await api.post('/auth/register', {

            username: values.username,

            full_name: values.full_name,

            email: values.email,

            password: values.password,

          });

          toast('Account created. Log in.', 'success');

          setMode('login');

          return;

        }


        const data = await api.post('/auth/login', {

          email: values.email,

          password: values.password,

        });

        setToken(data.token);

        navigateTo('/dashboard');

      } catch (error) {

        const box = document.getElementById('form-error');

        box.textContent = error.message;

        box.classList.remove('hidden');

        btn.disabled = false;

        label.textContent = original;

      }

    };


    updateToggle();

    renderForm();


    app.querySelectorAll('[data-mode]').forEach((btn) => {

      btn.addEventListener('click', () => {

        if (btn.dataset.mode !== current) setMode(btn.dataset.mode);

      });

    });

  };

}