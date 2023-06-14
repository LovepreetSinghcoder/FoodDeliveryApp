import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const PromotionOffersScreen = () => {
  const [promotions, setPromotions] = useState([
    // {
    //   id: '1',
    //   title: '20% Off on All Pizzas',
    //   description: 'Use code PIZZA20 to avail the discount',
    // },
    {
      id: '2',
      title: 'Free Delivery on Orders Above ₹100',
      description: 'No promo code required. Valid for a limited time.',
    },
    // Additional promotions
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
