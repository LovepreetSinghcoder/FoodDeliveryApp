import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const PromotionOffersScreen = () => {
  const [promotions, setPromotions] = useState([
    {
      id: '1',
      title: '30-Day Food Delivery Trial!',
      description: 'Launching in your area for Desu Jodha, Mangeana, Haibuana, Phullo, Panniwala moreka, Jogewala, Sekhu residents. Try it out now!',
    },
    {
      id: '5',
      title: 'Cash on Delivery Available',
      description: 'Pay with cash when your delicious meal arrives at your doorstep!',
    },
    // {
    //   id: '2',
    //   title: 'Free Delivery on Orders Above ₹500',
    //   description: 'No promo code required. Valid for a limited time.',
    // },
    // {
    //   id: '3',
    //   title: 'Buy One Get One Free on Burgers',
    //   description: 'Order any burger, and get a second one for free!',
    // },
    {
      id: '4',
      title: 'Weekend Combo Deal',
      description: 'Enjoy special weekend deals every Saturday and Sunday!',
    },
    

    // Add more promotions here
  ]);

  const renderPromotion = ({ item }) => (
    <View style={styles.promotionItem}>
      <Text style={styles.promotionTitle}>{item.title}</Text>
      <Text style={styles.promotionDescription}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Promotions and Offers</Text>
      <FlatList
        data={promotions}
        renderItem={renderPromotion}
        keyExtractor={(item) => item.id}
        style={styles.promotionList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  promotionList: {
    flex: 1,
  },
  promotionItem: {
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
  },
  promotionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  promotionDescription: {
    fontSize: 14,
  },
});

export default PromotionOffersScreen;
