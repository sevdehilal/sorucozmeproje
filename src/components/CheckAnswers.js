import React from 'react';
import { Card, Typography, Button, Row, Col } from 'antd';

const { Title, Text } = Typography;

const CheckAnswers = ({ examQuestions, selectedAnswers }) => {
  const calculateScore = () => {
    let correctAnswers = 0;
    let wrongAnswers = 0;
    //Sınavdaki her bir soru üzerinde döner:
    examQuestions.forEach((question, index) => {
      const correctOptionIndex = parseInt(question.correctAnswer, 10);
      const selectedOptionIndex = selectedAnswers[index];

      // Doğru ve yanlış cevapları say
      if (correctOptionIndex === selectedOptionIndex) {
        correctAnswers += 1;
      } else if (selectedOptionIndex !== undefined) { // Eğer bir cevap seçildiyse
        wrongAnswers += 1;
      }
    });

    // 4 yanlış 1 doğruyu götürüyor, doğru cevaplardan bu değeri düş
    const netScore = correctAnswers - (wrongAnswers * 0.25);
    return { correctAnswers, wrongAnswers, netScore };
  };

  const { correctAnswers, wrongAnswers, netScore } = calculateScore();
  const totalQuestions = examQuestions.length;

  return (
    <Card
      bordered={false}
      style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px', overflow: 'hidden', marginBottom: '20px' }}
      bodyStyle={{ padding: '24px' }}
    >
      <Row justify="center">
        <Col>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <Title level={2}>Sınav Sonuçları</Title>
            <Text strong>Toplam Doğru Cevap Sayısı: {correctAnswers} / {totalQuestions}</Text>
            <br />
            <Text strong>Toplam Yanlış Cevap Sayısı: {wrongAnswers}</Text>
            <br />
            <Text strong>Net Puan: {netScore.toFixed(2)}</Text> {/* Puanı virgülden sonra iki hane ile göster */}
          </div>
        </Col>
      </Row>
      
    </Card>
  );
};

export default CheckAnswers;


