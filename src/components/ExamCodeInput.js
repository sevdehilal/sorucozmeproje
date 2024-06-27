import React from 'react';
import { Input, Button, Form } from 'antd';

const ExamCodeInput = ({ examCode, setExamCode, fetchExamQuestions }) => (
  <Form layout="vertical">
    <Form.Item label="Exam Code">
      <Input value={examCode} onChange={(e) => setExamCode(e.target.value)} />
      <Button type="primary" onClick={fetchExamQuestions} style={{ marginTop: '10px', width: '100%' }}>
        Get Questions
      </Button>
    </Form.Item>
  </Form>
);

export default ExamCodeInput;
