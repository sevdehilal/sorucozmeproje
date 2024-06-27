import React, { useState } from 'react';
import { Typography, Space, Button, Modal, Form, Input, message } from 'antd';
import { UserOutlined, LockOutlined, HomeOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Text } = Typography;

const UserProfileInfo = ({ rowId, username, password, classroom, gmail, phone, setUserData }) => {
  const [visible, setVisible] = useState(false); // Modal'in görünür olup olmadığını belirler
  const [loading, setLoading] = useState(false); // Kaydetme işlemi sırasında butonun yüklenme durumunu belirtir

  const [form] = Form.useForm(); // Ant Design formunu yönetmek için kullanılır

  // Modal'i açma fonksiyonu, formu mevcut kullanıcı bilgileriyle doldurur
  const handleOpenModal = () => {
    setVisible(true);
    form.setFieldsValue({ username, password, classroom, gmail, phone }); // Formu mevcut bilgilerle doldur
  };

  // Modal'i kapatma fonksiyonu
  const handleCloseModal = () => {
    setVisible(false);
    form.resetFields(); // Formu sıfırla
  };

  // Değişiklikleri kaydetme fonksiyonu
  const handleSaveChanges = async () => {
    try {
      setLoading(true); // Yüklenme durumunu true yaparak, kullanıcıya bir işlemin yürütülmekte olduğunu belirtir
      const values = await form.validateFields(); // Formdaki tüm alanların doğrulama kurallarını kontrol eder
      const updatedData = { row_id: rowId, ...values }; // Values nesnesindeki tüm alanlar, row_id ile birlikte yeni bir nesneye (updatedData) eklenir

      // API'ye güncelleme isteği gönder
      const response = await axios.put('https://v1.nocodeapi.com/pnurdemirtas/google_sheets/qSDpvYTFWqMjCvoZ?tabId=Sheet1', updatedData);

      if (response.status === 200) {
        // Başarı durumunda kullanıcı bilgilerini güncelle
        setUserData(updatedData);
        message.success('Profil bilgileri başarıyla güncellendi');
        setVisible(false); // Modal'i kapat
      } else {
        message.error('Profil bilgileri güncellenirken bir hata oluştu');
      }
    } catch (error) {
      console.error('Formu doğrularken bir hata oluştu:', error);
      message.error('Formu doğrularken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Space direction="vertical" style={{ width: '100%', marginBottom: '20px' }}>
      <Text strong style={{ color: '#1890ff' }}>
        <UserOutlined style={{ marginRight: '8px' }} />
        Kullanıcı Adı: {username}
      </Text>
      <Text strong style={{ color: '#f5222d' }}>
        <LockOutlined style={{ marginRight: '8px' }} />
        Şifre: {'******'}
      </Text> {/* Şifreyi maskeliyoruz */}
      <Text strong style={{ color: '#52c41a' }}>
        <HomeOutlined style={{ marginRight: '8px' }} />
        Sınıf: {classroom}
      </Text>
      <Text strong style={{ color: '#13c2c2' }}>
        <MailOutlined style={{ marginRight: '8px' }} />
        Email: {gmail}
      </Text>
      <Text strong style={{ color: '#faad14' }}>
        <PhoneOutlined style={{ marginRight: '8px' }} />
        Telefon: {phone}
      </Text>

      <Button type="primary" onClick={handleOpenModal}>
        Bilgileri Güncelle
      </Button>

      {/* Bilgileri değiştirmek için Modal */}
      <Modal
        title="Profil Bilgilerini Değiştir"
        visible={visible}
        onCancel={handleCloseModal}
        footer={[
          <Button key="cancel" onClick={handleCloseModal}>
            İptal
          </Button>,
          <Button key="submit" type="primary" onClick={handleSaveChanges} loading={loading}>
            Kaydet
          </Button>,
        ]}
      >
        {/* Form alanları */}
        <Form form={form} layout="vertical">
          <Form.Item
            name="username"
            label="Kullanıcı Adı"
            initialValue={username} // Mevcut kullanıcı adı
            rules={[{ required: true, message: 'Kullanıcı adı gereklidir' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Şifre"
            initialValue={password} // Mevcut şifre
            rules={[{ required: true, message: 'Şifre gereklidir' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="classroom"
            label="Sınıf"
            initialValue={classroom} // Mevcut sınıf
            rules={[{ required: true, message: 'Sınıf gereklidir' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="gmail"
            label="Email"
            initialValue={gmail} // Mevcut email
            rules={[
              { required: true, message: 'Email gereklidir' },
              { type: 'email', message: 'Geçerli bir email adresi giriniz' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Telefon"
            initialValue={phone} // Mevcut telefon
            rules={[{ required: true, message: 'Telefon gereklidir' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Space>
  );
};

export default UserProfileInfo;













