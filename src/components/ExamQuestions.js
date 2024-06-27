import React, { useEffect, useState, useCallback } from 'react';
import { Radio, Button, Form, Card, Typography, Alert } from 'antd';

const { Text } = Typography;

const ExamQuestions = ({
  examQuestions,//sınav sorularının bir dizisini içerir
  selectedAnswers,// Bileşen, seçilen yanıtları göstermek ve değiştirmek için bu bilgiyi kullanır.
  handleAnswerChange,//yanıt değişikliklerini işlemek
  currentQuestionIndex,//mevcut soru indeksi
  setCurrentQuestionIndex,//mevcut soru indeksini güncellemek
}) => {
  const [timeLeft, setTimeLeft] = useState(30);//Kalan süreyi tutmak için bir durum
  const [intervalId, setIntervalId] = useState(null);//Zamanlayıcıyı temizlemek için kullanılacak interval ID'sini saklamak için bir durum.

  // Sonraki soruya geçiş fonksiyonu
  const handleNextQuestion = useCallback(() => {
    //useCallback hook'u, bu fonksiyonun yalnızca bağımlılıkları (burada currentQuestionIndex, examQuestions.length, setCurrentQuestionIndex) değiştiğinde yeniden oluşturulmasını sağlar.
    if (currentQuestionIndex < examQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(30); // Zamanlayıcıyı sıfırla
    }
  }, [currentQuestionIndex, examQuestions.length, setCurrentQuestionIndex]);

  // her yeni soruda kalan süreyi göstermek ve zamanlayıcı süresi dolunca otomatik olarak bir sonraki soruya geçmek için
  //zamanlayıcıyı her soruya geçişte sıfırlar ve zaman dolduğunda otomatik olarak bir sonraki soruya geçiş yapar.
  useEffect(() => {
    // Eğer intervalId değişkeni tanımlanmışsa, yani bir zamanlayıcı zaten aktifse, bu zamanlayıcı clearInterval(intervalId) ile durdurulur.
    if (intervalId) {
      clearInterval(intervalId);
    }
    //Bu, eski zamanlayıcının durdurulup yenisinin başlatılmasını sağlar. Böylece birden fazla zamanlayıcının aynı anda çalışması önlenir.

    // Yeni zamanlayıcı başlat
    const newTimer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          handleNextQuestion(); // Zaman dolduğunda sonraki soruya geç
          return 30; // Zamanlayıcıyı sıfırla
        }
        return prevTime - 1;
      });
    }, 1000);

    // setIntervalId ile yeni zamanlayıcı ID'sini sakla
    setIntervalId(newTimer);

    // Temizleme işlevi: bileşen güncellenirken veya kaldırılırken zamanlayıcıyı temizle
    return () => clearInterval(newTimer);
  }, [currentQuestionIndex, handleNextQuestion]);

  // Her soru değiştiğinde zamanlayıcıyı sıfırla
  useEffect(() => {
    setTimeLeft(30);
  }, [currentQuestionIndex]);

  const currentQuestion = examQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === examQuestions.length - 1;

  return (
    <Card
      bordered={false}
      style={{
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
        overflow: 'hidden',
        marginBottom: '20px',
        backgroundColor: '#f9f9f9',
      }}
      bodyStyle={{ padding: '24px', backgroundColor: 'white', borderRadius: '10px' }}
    >
      <Alert
        message="Bu sınavı yalnızca 1 kez yanıtlayabilirsiniz."
        type="warning"
        showIcon
        style={{ marginBottom: '20px', textAlign: 'center' }}
      />

      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <Text strong style={{ fontSize: '18px' }}>Soru {currentQuestion.questionId}: {currentQuestion.questionText}</Text>
      </div>

      <Form.Item>
        <Radio.Group
        //onChange: Kullanıcı bir seçenek seçtiğinde çalışacak olan olay işleyicisidir. handleAnswerChange fonksiyonunu çağırır ve bu fonksiyon, seçilen yanıtı selectedAnswers state'ine kaydeder.
          onChange={(e) => handleAnswerChange(currentQuestionIndex, e.target.value)}
          value={selectedAnswers[currentQuestionIndex]}// Seçilen radyo düğmesinin değeri selectedAnswers state'inden alınan değer gösterilir.
        >
          <Radio style={radioStyle} value={1}>{currentQuestion.option1}</Radio>
          <Radio style={radioStyle} value={2}>{currentQuestion.option2}</Radio>
          <Radio style={radioStyle} value={3}>{currentQuestion.option3}</Radio>
          <Radio style={radioStyle} value={4}>{currentQuestion.option4}</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item style={{ textAlign: 'center' }}>
        {!isLastQuestion && (
          <Button
            type="primary"
            onClick={handleNextQuestion}
            style={{ width: '100%', backgroundColor: '#1890ff', borderColor: '#1890ff' }}
          >
            Sonraki Soru



          </Button>
        )}
        {isLastQuestion && (
          <Button
            type="primary"
            onClick={() => {}}
            style={{ width: '100%', backgroundColor: '#1890ff', borderColor: '#1890ff', display: 'none' }}
          >
            Sınavı Bitir
          </Button>
        )}
      </Form.Item>

      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <Text strong>Kalan Süre: {timeLeft} saniye</Text>
      </div>
    </Card>
  ); 
};

const radioStyle = {
  display: 'block',
  height: 'auto',
  lineHeight: '30px',
};

export default ExamQuestions;





































     


















