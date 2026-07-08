import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Form,
  Input,
  Modal,
  Popconfirm,
  Space,
  Table,
  Typography,
  message,
} from "antd";
import {
  createCarApi,
  deleteCarApi,
  getCarsApi,
  updateCarApi,
} from "../features/cars/api";
import useAuthStore from "../features/auth/authStore";

const CarListPage = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const [form] = Form.useForm();
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCar, setEditingCar] = useState(null);

  const refreshCars = async () => {
    setIsLoading(true);

    try {
      const data = await getCarsApi();
      setCars(data);
    } catch (error) {
      message.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    getCarsApi()
      .then((data) => {
        if (isMounted) {
          setCars(data);
        }
      })
      .catch((error) => {
        if (isMounted) {
          message.error(error.message);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const openCreateModal = () => {
    setEditingCar(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const openEditModal = (car) => {
    setEditingCar(car);
    form.setFieldsValue(car);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCar(null);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    setIsSaving(true);

    try {
      if (editingCar) {
        await updateCarApi(editingCar.id, values);
        message.success("Car updated");
      } else {
        await createCarApi(values);
        message.success("Car created");
      }

      closeModal();
      refreshCars();
    } catch (error) {
      message.error(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCarApi(id);
      message.success("Car deleted");
      refreshCars();
    } catch (error) {
      message.error(error.message);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const columns = [
    {
      title: "License Plate",
      dataIndex: "licensePlate",
      key: "licensePlate",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
      render: (value) => value || "-",
    },
    {
      title: "Actions",
      key: "actions",
      width: 160,
      render: (_, car) => (
        <Space>
          <Button type="link" onClick={() => openEditModal(car)}>
            Edit
          </Button>
          <Popconfirm
            title="Delete car"
            description="Are you sure you want to delete this car?"
            okText="Delete"
            okButtonProps={{ danger: true }}
            onConfirm={() => handleDelete(car.id)}
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Typography.Text className="font-medium uppercase tracking-wide text-blue-600">
              Car Management
            </Typography.Text>
            <Typography.Title level={2} className="!mb-0">
              Cars
            </Typography.Title>
          </div>

          <Space>
            <Button onClick={handleLogout}>Logout</Button>
            <Button type="primary" onClick={openCreateModal}>
              Add Car
            </Button>
          </Space>
        </div>

        <Card>
          <Table
            rowKey="id"
            columns={columns}
            dataSource={cars}
            loading={isLoading}
            pagination={{ pageSize: 10 }}
          />
        </Card>
      </div>

      <Modal
        title={editingCar ? "Edit Car" : "Add Car"}
        open={isModalOpen}
        onCancel={closeModal}
        onOk={() => form.submit()}
        okText={editingCar ? "Save" : "Create"}
        confirmLoading={isSaving}
        destroyOnHidden
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="License Plate"
            name="licensePlate"
            rules={[
              { required: true, message: "Please enter the license plate" },
            ]}
          >
            <Input placeholder="License plate" />
          </Form.Item>

          <Form.Item
            label="Brand"
            name="brand"
            rules={[{ required: true, message: "Please enter the brand" }]}
          >
            <Input placeholder="Brand" />
          </Form.Item>

          <Form.Item
            label="Model"
            name="model"
            rules={[{ required: true, message: "Please enter the model" }]}
          >
            <Input placeholder="Model" />
          </Form.Item>

          <Form.Item label="Note" name="note">
            <Input.TextArea rows={3} placeholder="Note" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CarListPage;
