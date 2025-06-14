import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { AuthForm } from '../AuthForm';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    Meteor.loginWithPassword(email, password, (err) => {
      setIsLoading(false);
      if (err) {
        setError(err.reason);
        return
      }
      navigate('/');
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f9f4ef] px-4">
    <div className="flex w-full max-w-6xl">
      <AuthForm
        title="Faça Login"
        subtitle="Entre e agende o seu serviço conosco!"
        onSubmit={handleSubmit}
        fields={[
          { name: 'email', label: 'Email', type: 'email', placeholder: 'Digite seu e-mail' },
          { name: 'password', label: 'Senha', type: 'password', placeholder: 'Digite sua senha' },
        ]}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        buttonText="Login"
        footerText="Não tem uma conta?"
        footerLink={{ text: 'Registre-se', to: '/signup' }}
        keepLoggedInOption={true}
        forgotPasswordLink='/forgot-password'
      />

      <div className="hidden md:flex w-1/2 items-center justify-center p-8">
        <img src="" alt="Imagem" className="max-w-full h-auto" />
      </div>
      
    </div>
  </div>
  );
}