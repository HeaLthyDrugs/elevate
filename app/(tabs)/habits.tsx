import { StyleSheet, Platform, View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HABITS = [
  {
    id: 1,
    name: 'Morning Meditation',
    icon: 'meditation',
    streak: 12,
    category: 'Mindfulness',
    progress: 0.8,
    color: '#9C27B0',
  },
  {
    id: 2,
    name: 'Daily Exercise',
    icon: 'weight-lifter',
    streak: 8,
    category: 'Fitness',
    progress: 0.6,
    color: '#4CAF50',
  },
  {
    id: 3,
    name: 'Read Books',
    icon: 'book-open-page-variant',
    streak: 15,
    category: 'Learning',
    progress: 1,
    color: '#FF9800',
  },
  {
    id: 4,
    name: 'Drink Water',
    icon: 'water',
    streak: 20,
    category: 'Health',
    progress: 0.5,
    color: '#2196F3',
  },
];

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function Habits() {
  const insets = useSafeAreaInsets();
  const screenWidth = Dimensions.get('window').width;

  const renderWeekProgress = () => {
    return (
      <View style={styles.weekContainer}>
        {DAYS.map((day, index) => (
          <View key={index} style={styles.dayColumn}>
            <View style={[styles.dayDot, index < 5 && styles.dayDotCompleted]} />
            <Text style={styles.dayText}>{day}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#6200EA', '#3700B3']}
        style={[styles.header, { paddingTop: insets.top + 20 }]}
      >
        <Text style={styles.headerTitle}>My Habits</Text>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>4</Text>
            <Text style={styles.statLabel}>Active Habits</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>85%</Text>
            <Text style={styles.statLabel}>Completion Rate</Text>
          </View>
        </View>
        {renderWeekProgress()}
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.habitsList}>
          {HABITS.map((habit) => (
            <TouchableOpacity key={habit.id} style={styles.habitCard}>
              <View style={[styles.habitIcon, { backgroundColor: `${habit.color}20` }]}>
                <MaterialCommunityIcons name={habit.icon} size={24} color={habit.color} />
              </View>
              <View style={styles.habitInfo}>
                <Text style={styles.habitName}>{habit.name}</Text>
                <Text style={styles.habitCategory}>{habit.category}</Text>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${habit.progress * 100}%`, backgroundColor: habit.color }]} />
                </View>
              </View>
              <View style={styles.streakContainer}>
                <MaterialCommunityIcons name="fire" size={16} color="#FF9800" />
                <Text style={styles.streakText}>{habit.streak}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
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
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginHorizontal: 20,
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  dayColumn: {
    alignItems: 'center',
  },
  dayDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginBottom: 8,
  },
  dayDotCompleted: {
    backgroundColor: '#4CAF50',
  },
  dayText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  content: {
    flex: 1,
    marginTop: -20,
    backgroundColor: '#F5F6FA',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
  },
  habitsList: {
    paddingHorizontal: 20,
  },
  habitCard: {
    flexDirection: 'row',
    alignItems: 'center',
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
  habitIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  habitInfo: {
    flex: 1,
  },
  habitName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 4,
  },
  habitCategory: {
    fontSize: 12,
    color: '#636E72',
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  streakText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF9800',
    marginLeft: 4,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#6200EA',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});
