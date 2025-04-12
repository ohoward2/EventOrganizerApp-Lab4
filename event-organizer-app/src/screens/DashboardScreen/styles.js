import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: "#fff" 
},
  greeting: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 4,
    color: "#1B9AAA",
  },
  subtitle: { 
    fontSize: 16, 
    color: "#777", 
    marginBottom: 16 },
  eventItem: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 1,
  },
  eventTitle: { 
    fontWeight: "bold", 
    fontSize: 16, 
    marginBottom: 4 },
  eventLocation: { color: "#555" },
  addEvent: {
    backgroundColor: "#ff8600",
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});

export default styles;
