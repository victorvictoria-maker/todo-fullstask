import { useActionState, useState } from "react";
import { Label } from "../ui/label.tsx";
import { Input } from "../ui/input.tsx";
import { Button } from "../ui/button.tsx";
import { Link } from "react-router-dom";
import { register, useSuccessRedirect } from "../../actions/userActions";
import type { HandleChangeEvent } from "../../lib/types";

const Register = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [state, formAction, isPending] = useActionState(register, {
    success: null,
    error: null,
  });

  const handleChange = (e: HandleChangeEvent): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useSuccessRedirect(state.success, "/login", 2000);

  return (
    <div className='h-screen flex justify-center items-center transform -translate-y-16'>
      <form
        action={formAction}
        className='flex flex-col gap-6 max-w-xl w-full px-8'
      >
        <div className='flex flex-col gap-2'>
          <Label>Email</Label>
          <Input
            type='email'
            name='email'
            placeholder='Enter email'
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <Label>Password</Label>
          <Input
            type='password'
            name='password'
            placeholder='Enter password'
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        {state.success && (
          <span className='message successMessage'>
            {state.success} {"Redirecting..."}
          </span>
        )}
        {state.error && <span className='message'>{state.error}</span>}
        <Button disabled={isPending}>
          {isPending ? "Registering" : "Register"}
        </Button>
        <span className='text-[#63657b] text-center'>
          Already have an account?{" "}
          <Link
            to={"/login"}
            className='transition ease-in-out hover:cursor-pointer hover:underline hover:text-primary'
          >
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
