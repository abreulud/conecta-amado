import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

export const AuthForm = ({
  title = "Registre-se",
  subtitle = "Preencha as informações",
  fields = [],
  buttonText = "Avançar",
  footerText = "",
  footerLink = { text: "", to: "" },
  forgotPasswordLink,
  keepLoggedInOption,
  onSubmit,
  onNameChange,
  onEmailChange,
  onPasswordChange,
  onConfirmPasswordChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full md:w-1/2 p-10 bg-[#e7ecfa] rounded-lg shadow-md max-w-[505px] flex flex-col justify-between">
      <h2 className="text-xl text-gray-700">Bem-vinde!</h2>
      <h1 className="text-4xl font-bold text-black">{title}</h1>
      <p className="text-gray-500 mt-2">{subtitle}</p>

      <form className="space-y-4 my-14" onSubmit={onSubmit}>
        {fields.map((field, idx) => {
          if (field.type === "select-phone") {
            return (
              <div key={idx}>
                <label className="text-sm block mb-1">{field.label}</label>
                <div className="flex gap-2">
                  <select className="w-1/3 rounded border bg-white border-gray-300 px-2 py-4 focus:outline-none">
                    <option value="+55">🇧🇷 +55</option>
                  </select>
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    className="w-2/3 rounded border border-gray-300 px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </div>
            );
          }

          const isPassword = field.type === "password";

          return (
            <div key={idx}>
              <label className="text-sm block mb-1">{field.label}</label>
              <div className="relative">
                <input
                  type={isPassword && showPassword ? "text" : field.type}
                  placeholder={field.placeholder}
                  className="w-full rounded border border-gray-300 px-3 py-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onChange={(e) => {
                    const value = e.target.value;
                    switch (field.name) {
                    case 'email':
                        onEmailChange?.(value);
                        break;
                    case 'password':
                        onPasswordChange?.(value);
                        break;
                    case 'confirmPassword':
                        onConfirmPasswordChange?.(value);
                        break;
                    case 'fullName':
                        onNameChange?.(value);
                        break;
                    default:
                        break;
                    }
                  }}  
                />
                {isPassword && (
                  <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-5 text-gray-600 focus:outline-none "
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible size={20} />
                  ) : (
                    <AiOutlineEye size={20} />
                  )}
                </button>
                )}
              </div>
            </div>
          );
        })}

        {(keepLoggedInOption || forgotPasswordLink) && (
          <div className="flex justify-between items-center text-sm text-gray-700 mt-2">
            {keepLoggedInOption && (
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="keepLogged" className="text-xs accent-black" />
                <label htmlFor="keepLogged" className="text-xs">Lembrar-me</label>
              </div>
            )}
            {forgotPasswordLink && (
              <Link
                to={forgotPasswordLink}
                className="accent-black text-xs hover:underline"
              >
                Esqueceu a senha?
              </Link>
            )}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-black font-bold text-white py-4 rounded hover:bg-gray-800 transition"
        >
          {buttonText}
        </button>
      </form>

      {footerText && footerLink?.text && (
        <p className="text-gray-600 text-center">
          {footerText}{' '}
          <Link to={footerLink.to} className="text-black font-medium hover:underline">
            {footerLink.text}
          </Link>
        </p>
      )}
    </div>
  );
};