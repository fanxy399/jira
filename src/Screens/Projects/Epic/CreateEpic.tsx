import { Drawer, DrawerProps, Input, Spin, Form, Button } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import { useEffect } from "react";
import styled from "styled-components";
import { useAddEpic } from "utils/epic";
import { useProjectIdInUrl } from "../Kanban/util";
import { useEpicQueryKey } from "./utils";

export default function CreateEpic({
  onClose,
  visible,
}: Pick<DrawerProps, "visible"> & { onClose: () => void }) {
  const { mutateAsync: addEpic, isLoading, error } = useAddEpic(
    useEpicQueryKey()
  );
  const projectId = useProjectIdInUrl();
  const [form] = useForm();
  const onFinish = async (values: any) => {
    await addEpic({ ...values, projectId });
    onClose();
  };
  useEffect(() => {
    form.resetFields();
  }, [form, visible]);
  return (
    <Drawer
      destroyOnClose={true}
      forceRender={true}
      onClose={onClose}
      visible={visible}
      width={"100%"}
    >
      <Container>
        {isLoading ? (
          <Spin size="large" tip="Loading..." />
        ) : (
          <>
            <h1>创建任务组</h1>
            <ErrorBox error={error} />
            <Form
              form={form}
              layout={"vertical"}
              style={{ width: "40rem" }}
              onFinish={onFinish}
            >
              <Form.Item
                label={"名称"}
                name={"name"}
                rules={[{ required: true, message: "请输入任务组名称" }]}
              >
                <Input placeholder={"请输入任务组名称"} />
              </Form.Item>
              <Form.Item>
                <Button
                  type={"primary"}
                  htmlType={"submit"}
                  loading={isLoading}
                >
                  提交
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Container>
    </Drawer>
  );
}

const Container = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
