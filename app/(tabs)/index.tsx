import { Image, StyleSheet, Platform, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#4A90E2', '#357ABD']}
        style={[styles.header, { paddingTop: insets.top + 20 }]}
      >
        <View style={styles.welcomeContainer}>
          <Text style={styles.greeting}>Good Morning</Text>
          <Text style={styles.name}>John</Text>
        </View>
        <View style={styles.profileContainer}>
          <TouchableOpacity style={styles.profileButton}>
            <Ionicons name="person-circle-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Ionicons name="heart-outline" size={24} color="#E74C3C" />
            <Text style={styles.statValue}>72</Text>
            <Text style={styles.statLabel}>Heart Rate</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="footsteps-outline" size={24} color="#2ECC71" />
            <Text style={styles.statValue}>8,234</Text>
            <Text style={styles.statLabel}>Steps</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="flame-outline" size={24} color="#F39C12" />
            <Text style={styles.statValue}>1,840</Text>
            <Text style={styles.statLabel}>Calories</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <View style={[styles.actionIcon, { backgroundColor: '#E8F5E9' }]}>
              <Ionicons name="fitness-outline" size={24} color="#2ECC71" />
            </View>
            <Text style={styles.actionText}>Workouts</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <View style={[styles.actionIcon, { backgroundColor: '#E3F2FD' }]}>
              <Ionicons name="water-outline" size={24} color="#4A90E2" />
            </View>
            <Text style={styles.actionText}>Water</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <View style={[styles.actionIcon, { backgroundColor: '#FFF3E0' }]}>
              <Ionicons name="nutrition-outline" size={24} color="#F39C12" />
            </View>
            <Text style={styles.actionText}>Nutrition</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Today's Goals</Text>
        <View style={styles.goalsContainer}>
          <View style={styles.goalCard}>
            <View style={styles.goalHeader}>
              <Ionicons name="trophy-outline" size={20} color="#4A90E2" />
              <Text style={styles.goalProgress}>6/8</Text>
            </View>
            <Text style={styles.goalText}>Drink 8 glasses of water</Text>
          </View>
          <View style={styles.goalCard}>
            <View style={styles.goalHeader}>
              <Ionicons name="walk-outline" size={20} color="#2ECC71" />
              <Text style={styles.goalProgress}>8.2k/10k</Text>
            </View>
            <Text style={styles.goalText}>Walk 10,000 steps</Text>
          </View>
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
    paddingHorizontal: 20,
    paddingBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  welcomeContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  profileContainer: {
    justifyContent: 'center',
  },
  profileButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: -20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    width: '31%',
    alignItems: 'center',
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
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 8,
    color: '#2D3436',
  },
  statLabel: {
    fontSize: 12,
    color: '#636E72',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#2D3436',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  actionButton: {
    alignItems: 'center',
    width: '31%',
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    color: '#2D3436',
  },
  goalsContainer: {
    marginBottom: 24,
  },
  goalCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
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
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  goalProgress: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A90E2',
  },
  goalText: {
    fontSize: 14,
    color: '#2D3436',
  },
});
