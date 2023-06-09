import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'New Order Received',
      message: 'You have a new order from Table 5.',
    },
    {
      id: '2',
      title: 'Order Delivered',
      message: 'Order #123 has been delivered successfully.',
    },
    // Additional notifications
  ]);

  const renderNotification = ({ item }) => (
    <View style={styles.notificationItem}>
      <Text style={styles.notificationTitle}>{item.title}</Text>
      <Text style={styles.notificationMessage}>{item.message}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Notifications</Text>
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
        style={styles.notificationList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    // backgroundColor: 'green'
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  notificationList: {
    flex: 1,
  },
  notificationItem: {
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  notificationMessage: {
    fontSize: 14,
  },
});

export default NotificationScreen;
