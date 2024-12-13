import { StyleSheet, Platform, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React from 'react';

const STATS = [
  { id: 1, label: 'Streak', value: '12 Days', icon: 'fire' },
  { id: 2, label: 'Points', value: '2,450', icon: 'star' },
  { id: 3, label: 'Completed', value: '85%', icon: 'check-circle' },
];

const ACHIEVEMENTS = [
  {
    id: 1,
    title: 'Early Bird',
    description: 'Complete morning routine for 7 days',
    progress: 5,
    total: 7,
    icon: 'weather-sunny',
    color: '#FF9800',
  },
  {
    id: 2,
    title: 'Mindfulness Master',
    description: 'Meditate for 10 days straight',
    progress: 8,
    total: 10,
    icon: 'meditation',
    color: '#9C27B0',
  },
  {
    id: 3,
    title: 'Knowledge Seeker',
    description: 'Read 5 articles this week',
    progress: 3,
    total: 5,
    icon: 'book-open-page-variant',
    color: '#2196F3',
  },
];

const MENU_ITEMS = [
  { id: 1, title: 'Personal Information', icon: 'person-outline' },
  { id: 2, title: 'Notifications', icon: 'notifications-outline' },
  { id: 3, title: 'Privacy Settings', icon: 'lock-closed-outline' },
  { id: 4, title: 'Help & Support', icon: 'help-circle-outline' },
  { id: 5, title: 'About App', icon: 'information-circle-outline' },
];

export default function Profile() {
  const insets = useSafeAreaInsets();

  const renderStat = (stat: typeof STATS[0]) => (
    <View key={stat.id} style={styles.statCard}>
      <MaterialCommunityIcons name={stat.icon} size={24} color="#1A237E" />
      <Text style={styles.statValue}>{stat.value}</Text>
      <Text style={styles.statLabel}>{stat.label}</Text>
    </View>
  );

  const renderAchievement = (achievement: typeof ACHIEVEMENTS[0]) => (
    <View key={achievement.id} style={styles.achievementCard}>
      <View style={[styles.achievementIcon, { backgroundColor: `${achievement.color}20` }]}>
        <MaterialCommunityIcons name={achievement.icon} size={24} color={achievement.color} />
      </View>
      <View style={styles.achievementInfo}>
        <Text style={styles.achievementTitle}>{achievement.title}</Text>
        <Text style={styles.achievementDescription}>{achievement.description}</Text>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${(achievement.progress / achievement.total) * 100}%`,
                backgroundColor: achievement.color,
              },
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          {achievement.progress}/{achievement.total}
        </Text>
      </View>
    </View>
  );

  const renderMenuItem = (item: typeof MENU_ITEMS[0]) => (
    <TouchableOpacity key={item.id} style={styles.menuItem}>
      <View style={styles.menuIconContainer}>
        <Ionicons name={item.icon} size={24} color="#1A237E" />
      </View>
      <Text style={styles.menuTitle}>{item.title}</Text>
      <Ionicons name="chevron-forward" size={24} color="#1A237E" />
    </TouchableOpacity>
  );

  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>Sarah Johnson</Text>
            <Text style={styles.email}>sarah.j@example.com</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="pencil" size={20} color="#1A237E" />
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          {STATS.map(renderStat)}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        <View style={styles.achievementsContainer}>
          {ACHIEVEMENTS.map(renderAchievement)}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <View style={styles.menuContainer}>
          {MENU_ITEMS.map(renderMenuItem)}
        </View>
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
    backgroundColor: 'white',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    padding: 20,
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
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A237E',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#666',
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8EAF6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    marginHorizontal: 4,
    backgroundColor: '#F5F6FA',
    borderRadius: 12,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A237E',
    marginVertical: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A237E',
    marginBottom: 16,
  },
  achievementsContainer: {
    gap: 12,
  },
  achievementCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
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
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A237E',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    marginBottom: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    alignSelf: 'flex-end',
  },
  menuContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F6FA',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8EAF6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuTitle: {
    flex: 1,
    fontSize: 16,
    color: '#2D3436',
  },
});