import { StyleSheet, Platform, View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React, { useState } from 'react';

const CATEGORIES = [
  { id: 1, name: 'Mindfulness', icon: 'brain' },
  { id: 2, name: 'Productivity', icon: 'rocket-launch' },
  { id: 3, name: 'Health', icon: 'heart-pulse' },
  { id: 4, name: 'Leadership', icon: 'account-group' },
  { id: 5, name: 'Creativity', icon: 'lightbulb-on' },
];

const FEATURED_ARTICLES = [
  {
    id: 1,
    title: 'The Science of Better Sleep',
    category: 'Health',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809',
  },
  {
    id: 2,
    title: 'Mastering Deep Work',
    category: 'Productivity',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643',
  },
];

const LATEST_ARTICLES = [
  {
    id: 1,
    title: 'Building Mental Resilience',
    category: 'Mindfulness',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b',
  },
  {
    id: 2,
    title: 'The Art of Time Management',
    category: 'Productivity',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9',
  },
  {
    id: 3,
    title: 'Effective Team Communication',
    category: 'Leadership',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902',
  },
];

export default function Knowledge() {
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  const renderCategory = (category: typeof CATEGORIES[0], index: number) => (
    <TouchableOpacity
      key={category.id}
      style={[
        styles.categoryButton,
        selectedCategory === index && styles.categoryButtonActive,
      ]}
      onPress={() => setSelectedCategory(index)}
    >
      <MaterialCommunityIcons
        name={category.icon}
        size={24}
        color={selectedCategory === index ? '#fff' : '#1A237E'}
      />
      <Text
        style={[
          styles.categoryText,
          selectedCategory === index && styles.categoryTextActive,
        ]}
      >
        {category.name}
      </Text>
    </TouchableOpacity>
  );

  const renderFeaturedArticle = (article: typeof FEATURED_ARTICLES[0]) => (
    <TouchableOpacity key={article.id} style={styles.featuredCard}>
      <Image source={{ uri: article.image }} style={styles.featuredImage} />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.featuredGradient}
      >
        <View style={styles.featuredContent}>
          <Text style={styles.featuredCategory}>{article.category}</Text>
          <Text style={styles.featuredTitle}>{article.title}</Text>
          <Text style={styles.featuredReadTime}>{article.readTime}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderArticle = (article: typeof LATEST_ARTICLES[0]) => (
    <TouchableOpacity key={article.id} style={styles.articleCard}>
      <Image source={{ uri: article.image }} style={styles.articleImage} />
      <View style={styles.articleContent}>
        <Text style={styles.articleCategory}>{article.category}</Text>
        <Text style={styles.articleTitle}>{article.title}</Text>
        <Text style={styles.articleReadTime}>{article.readTime}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Knowledge Hub</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={24} color="#1A237E" />
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
      >
        {CATEGORIES.map(renderCategory)}
      </ScrollView>

      <Text style={styles.sectionTitle}>Featured</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.featuredContainer}
      >
        {FEATURED_ARTICLES.map(renderFeaturedArticle)}
      </ScrollView>

      <Text style={styles.sectionTitle}>Latest Articles</Text>
      <View style={styles.articlesContainer}>
        {LATEST_ARTICLES.map(renderArticle)}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A237E',
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8EAF6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: '#E8EAF6',
  },
  categoryButtonActive: {
    backgroundColor: '#1A237E',
  },
  categoryText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#1A237E',
  },
  categoryTextActive: {
    color: '#fff',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A237E',
    marginLeft: 20,
    marginBottom: 16,
  },
  featuredContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  featuredCard: {
    width: 280,
    height: 200,
    marginRight: 16,
    borderRadius: 16,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '70%',
    justifyContent: 'flex-end',
    padding: 16,
  },
  featuredContent: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  featuredCategory: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.8,
    marginBottom: 4,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  featuredReadTime: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.8,
  },
  articlesContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  articleCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  articleImage: {
    width: 100,
    height: 100,
  },
  articleContent: {
    flex: 1,
    padding: 16,
  },
  articleCategory: {
    fontSize: 12,
    color: '#1A237E',
    marginBottom: 4,
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 4,
  },
  articleReadTime: {
    fontSize: 12,
    color: '#636E72',
  },
});
