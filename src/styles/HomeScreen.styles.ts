import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    padding: 16,
    paddingTop: 50,
  },
  heading: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    backgroundColor: '#222',
    borderRadius: 8,
    paddingHorizontal: 12,
    color: '#fff',
  },
  searchBtn: {
    backgroundColor: '#0055ff',
    marginLeft: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#222',
    padding: 12,
    borderRadius: 12,
    margin: 4,
    flex: 1,
  },
  title: {
    color: '#00eaff',
    fontSize: 18,
    fontWeight: '600',
  },
  country: {
    color: '#fff',
    fontSize: 14,
  },
  info: {
    color: '#ccc',
    fontSize: 12,
  },
});

export default styles;
