import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Card, Form, Input } from "antd";
import { loginApi } from "../features/auth/api";
import useAuthStore from "../features/auth/authStore";

const LoginPage = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (field) => (event) => {
    setFormData((current) => ({
      ...current,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const result = await loginApi(formData);
      const token = result?.accessToken ?? result?.token;
      const user = result?.user ?? null;

      if (!token) {
        throw new Error("Login response does not include an access token");
      }

      login(token, user);
      navigate("/cars", { replace: true });
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <Card className="w-full max-w-sm shadow-sm">
        <div className="mb-6">
          <p className="text-sm font-medium uppercase tracking-wide text-blue-600">
            Car Management
          </p>
          <h1 className="text-2xl font-semibold text-slate-900">Login</h1>
          <p className="mt-1 text-sm text-slate-500">
            Enter your username and password.
          </p>
        </div>

        <Form layout="vertical" onFinish={handleSubmit}>
          {errorMessage && (
            <Alert
              className="mb-4"
              message={errorMessage}
              type="error"
              showIcon
            />
          )}

          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please enter your username" }]}
          >
            <Input
              placeholder="Username"
              value={formData.username}
              onChange={handleChange("username")}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password
              placeholder="Password"
              value={formData.password}
              onChange={handleChange("password")}
            />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={isSubmitting} block>
            Login
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
