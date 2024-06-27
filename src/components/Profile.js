// Profile.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, message, Row, Col, Typography, Card, Layout, Menu } from 'antd';
import axios from 'axios';

import UserProfileInfo from './UserProfileInfo';
import ExamCodeInput from './ExamCodeInput';
import ExamQuestions from './ExamQuestions';
import CheckAnswers from './CheckAnswers';

const { Title } = Typography;
const { Header, Content } = Layout;

const Profile = ({ onLogout }) => {
  const location = useLocation();
  const { username } = location.state || {};
  const [userData, setUserData] = useState({ rowId: null, class: '', gmail: '', phone: '', gender: '' });
  const [examCode, setExamCode] = useState('');
  const [examQuestions, setExamQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://v1.nocodeapi.com/pnurdemirtas/google_sheets/qSDpvYTFWqMjCvoZ?tabId=Sheet1');
        const data = response.data.data;
        const user = data.find(user => user.username === username);
        if (user) {
          setUserData({
            rowId: user.row_id,
            class: user.class,
            gmail: user.gmail,
            phone: user.phone,
            gender: user.gender
          });
        } else {
          message.error('Kullanıcı bulunamadı');
        }
      } catch (error) {
        message.error('Kullanıcı verileri alınırken hata oluştu');
      }
    };

    if (username) {
      fetchUserData();
    }
  }, [username]);

  const fetchExamQuestions = async () => {
    if (examCode) {
      try {
        const response = await axios.get('https://v1.nocodeapi.com/pnurdemirtas/google_sheets/eeVLYidYdSnjtfUs?tabId=Sheet1');
        const questions = response.data.data.filter(question => question.examCode === examCode);
        if (questions.length > 0) {
          setExamQuestions(questions);
          setCurrentQuestionIndex(0);
          message.success('Sınav soruları başarıyla alındı');
        } else {
          message.error('Geçersiz sınav kodu');
          setExamQuestions([]);
        }
      } catch (error) {
        message.error('Sınav soruları alınırken hata oluştu');
        setExamQuestions([]);
      }
    }
  };

  //Bu fonksiyon, kullanıcı bir soruya cevap verdiğinde veya cevabını değiştirdiğinde çağrılır ve bu değişikliği uygulamanın durumuna (state) yansıtır

  const handleAnswerChange = (questionIndex, value) => {
    setSelectedAnswers(prev => ({ ...prev, [questionIndex]: value }));
  };

  const handleFinishExam = () => {
    setShowResults(true);
  };

  return (
    <Layout>
      <Header style={{ backgroundColor: '#001529', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <Title level={3} style={{ color: '#fff', margin: 0 }}>Quiz App</Title>
        </div>
        <Button type="primary" onClick={onLogout}>
          Çıkış Yap
        </Button>
      </Header>
      <Content style={{ padding: '20px' }}>
        <Row justify="center" style={{ minHeight: '100vh', padding: '20px' }}>
          <Col xs={24} sm={20} md={20} lg={12} xl={10} xxl={8}>
            <Card
              bordered={false}
              style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px', overflow: 'hidden' }}
              bodyStyle={{ padding: '24px' }}
            >
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <Title level={2}>Profil Bilgileri</Title>
              </div>
              <Row justify="center" gutter={16}>
                <Col xs={24} sm={16}>
                  <UserProfileInfo
                    rowId={userData.rowId}
                    username={username}
                    classroom={userData.class}
                    gmail={userData.gmail}
                    phone={userData.phone}
                    setUserData={setUserData}
                  />
                </Col>
              </Row>
            </Card>
            <Row justify="center" style={{ marginTop: '10px' }}>
              <Col xs={24} sm={20} md={16} lg={12} xl={10}>
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                  <ExamCodeInput examCode={examCode} setExamCode={setExamCode} fetchExamQuestions={fetchExamQuestions} />
                </div>
              </Col>
            </Row>
            {examQuestions.length > 0 && (
              <Row justify="center" style={{ marginTop: '20px' }}>
                <Col xs={24} sm={24} md={30} lg={30} xl={30} xxl={24}>
                  <ExamQuestions
                    examQuestions={examQuestions}
                    selectedAnswers={selectedAnswers}
                    handleAnswerChange={handleAnswerChange}
                    currentQuestionIndex={currentQuestionIndex}
                    setCurrentQuestionIndex={setCurrentQuestionIndex}
                  />
                  <Button type="primary" onClick={handleFinishExam} style={{ marginTop: '10px', width: '100%' }}>
                    Sınavı Bitir
                  </Button>
                </Col>
              </Row>
            )}
            {showResults && (
              <Row justify="center" style={{ marginTop: '20px' }}>
                <Col>
                  <CheckAnswers examQuestions={examQuestions} selectedAnswers={selectedAnswers} />
                </Col>
              </Row>
            )}
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Profile;











           
















