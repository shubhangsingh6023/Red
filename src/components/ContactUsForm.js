import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

function ContactUsForm() {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const SENDGRID_API_KEY = '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';
  const handleSubmit = () => {
    if (!name || !mobile || !email || !message) {
      Alert.alert('All fields are required');
      return;
    }

    axios({
      method: 'post',
      url: 'https://api.sendgrid.com/v3/mail/send',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${SENDGRID_API_KEY}`,
      },
      data: {
        personalizations: [
          {
            to: [
              {
                email: 'centroid2022@gmail.com',
              },
            ],
            subject: `New contact form submission from ${name}`,
          },
        ],
        from: {
          email: 'pedalstriangle@gmail.com', 
        },
        content: [
          {
            type: 'text/plain',
            value: `Name: ${name}\nMobile: ${mobile}\nEmail: ${email}\n\nMessage:\n${message}`,
          },
        ],
      },
    })
      .then(response => {
        console.log('Email sent', response);
        Alert.alert('Thank you for your message!');
        setName('');
        setMobile('');
        setEmail('');
        setMessage('');
      })
      .catch(error => {
        console.error('Error sending email', error);
        Alert.alert('An error occurred while sending your message. Please try again later.');
      });
  };

  const validateMobileNumber = () => {
    const mobileNumberRegex = /^[0-9]{10}$/;
    if (!mobileNumberRegex.test(mobile)) {
      Alert.alert('Please enter a valid mobile number');
    }
  };

  const validateEmail = () => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      Alert.alert('Please enter a valid email address');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Contact Us</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        value={mobile}
        onChangeText={setMobile}
        keyboardType="phone-pad"
        onEndEditing={validateMobileNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        onEndEditing={validateEmail}
      />
      <TextInput
        style={[styles.input, styles.message]}
        placeholder="Message"
        value={message}
        onChangeText={setMessage}
        multiline={true}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#fff',
    color: '#333',
    width: '100%',
    fontSize: 18,
  },
  message: {
    height: 120,
  },
  submitButton: {
    backgroundColor: '#ff6f61',
    paddingVertical: 18,
    paddingHorizontal: 60,
    borderRadius: 30,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 18,
  },
});


export default ContactUsForm;
