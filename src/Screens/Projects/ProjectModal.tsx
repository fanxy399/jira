import { useEffect } from "react";

import { Drawer, Form, Spin, Input, Button } from "antd";
import { ErrorBox } from "components/lib";
import UserSelect from "components/UserSelect";
import React from "react";
import { useAddProject, useEditProject } from "utils/project";
import { useProjectModal, useProjectsQueryKey } from "./util";
import styled from "styled-components";

export default function ProjectModal() {
  const {
    projectModalOpen,
    close,
    isLoading,
    editingProject,
  } = useProjectModal();
  const title = editingProject ? "编辑项目" : "新建项目";
  const [form] = Form.useForm();
  const useMutateProject = editingProject ? useEditProject : useAddProject;
  const { mutateAsync, isLoading: mutateLoading, error } = useMutateProject(
    useProjectsQueryKey()
  );
  const onFinish = (value: any) => {
    mutateAsync({ ...editingProject, ...value }).then(() => {
      handleClose();
    });
  };
  const handleClose = () => {
    form.resetFields();
    close();
  };
  useEffect(() => {
    form.setFieldsValue(editingProject);
  }, [editingProject, form]);
  return (
    <Drawer
      forceRender={true}
      width={"100%"}
      title={title}
      placement="right"
      onClose={handleClose}
      visible={projectModalOpen}
    >
      <ProjectMoadlForm>
        {isLoading ? (
          <Spin size="large" tip="Loading..." />
        ) : (
          <>
            <ErrorBox error={error} />
            <Form
              form={form}
              layout={"vertical"}
              onFinish={onFinish}
              style={{ width: "40rem" }}
            >
              <Form.Item
                label="项目名称"
                name="name"
                rules={[{ required: true, message: "请输入项目名称" }]}
              >
                <Input placeholder={"请输入项目名称"} />
              </Form.Item>
              <Form.Item
                label="部门"
                name="organization"
                rules={[{ required: true, message: "请输入部门名" }]}
              >
                <Input placeholder={"请输入部门名"} />
              </Form.Item>
              <Form.Item label="负责人" name="personId">
                <UserSelect defaultOptionName={"负责人"} />
              </Form.Item>
              <Form.Item style={{ textAlign: "right" }}>
                <Button
                  loading={mutateLoading}
                  type={"primary"}
                  htmlType={"submit"}
                >
                  提交
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </ProjectMoadlForm>
    </Drawer>
  );
}

const ProjectMoadlForm = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
