"use client";
import { toast } from "react-hot-toast";
import Input from "../(components)/Inputs/Input";
import axios from "axios";
import Button from "../(components)/Button";
import { useState } from "react";
import { useRouter } from "next/navigation";

const initialState = {
  name: "",
  email: "",
  password: "",
};

export default function ProfileComponent({ userId, name, email }) {
  const router = useRouter();
  const [state, setState] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(event) {
    setState({ ...state, [event.target.name]: event.target.value });
    console.log(event.target.value);
  }

  const onSubmit = (event) => {
    setIsLoading(true);
    event.preventDefault();

    axios
      .put(`/api/user/${userId}`, {
        ...state,
        hashedPassword: state.password,
      })
      .then(() => {
        toast.success("profile updated");
        router.refresh();
        router.push("/");
      })
      .catch((err) => {
        throw new Error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div>
      <h1>{name}</h1>
      <h3>{email}</h3>
      <div>
        <div>
          <form onSubmit={onSubmit} className="text-center">
            <div className="flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2">
              <Input
                placeholder="Name"
                id="name"
                type="text"
                name="name"
                onChange={handleChange}
                value={state.name}
              />
              <Input
                placeholder="Email"
                id="email"
                type="email"
                name="email"
                onChange={handleChange}
                value={state.email}
              />
              <Input
                placeholder="Password"
                id="password"
                type="password"
                name="password"
                onChange={handleChange}
                value={state.password}
              />
              <Button type="submit" label="Update" disabled={isLoading} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
