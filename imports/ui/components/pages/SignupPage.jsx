import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { AuthForm } from '../AuthForm';

export const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if(password !== confirmPassword){
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    Accounts.createUser({
      email, 
      password, 
      profile: { name } 
    }, (err) => {
      setIsLoading(false);
      if(err){
        setError(err.reason);
        return;
      }
      navigate('/');
    });
  };

  return (
      <div className="flex min-h-screen items-center justify-center bg-[#f9f4ef] px-4">
      <div className="flex w-full max-w-6xl">
        <AuthForm
          title="Registre-se"
          subtitle="Preencha as informações"
          onSubmit={handleSubmit}
          fields={[
            { name: 'fullName', label: 'Nome Completo', placeholder:'Digite seu nome completo'},
            { name: 'email', label: 'Email', type: 'email', placeholder: 'Digite seu e-mail' },
            { name: 'password', label: 'Senha', type: 'password', placeholder: 'Digite sua senha' },
            { name: 'confirmPassword', label: 'Confirmar senha', type: 'password', placeholder: 'Confirme sua senha' },
            { name: 'phone', label: 'Contato', type: 'select-phone', placeholder: '9823456789'},
          ]}
          onNameChange={setName}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onConfirmPasswordChange={setConfirmPassword}
          buttonText="Registrar"
          footerText="Já tem uma conta?"
          footerLink={{ text: 'Faça Login', to: '/login' }}
        />
  
        <div className="hidden md:flex w-1/2 items-center justify-center p-8">
          <img src="" alt="Imagem" className="max-w-full h-auto" />
        </div>
        
      </div>
    </div>
    );
}