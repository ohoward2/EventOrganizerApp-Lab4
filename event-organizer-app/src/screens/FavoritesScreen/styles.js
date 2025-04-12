import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: "#fff" 
},
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#FF8600",
  },
  event: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 1,
  },
  eventTitle: { 
    fontWeight: "bold", 
    fontSize: 16, 
    marginBottom: 4 
},
  eventLocation: { 
    color: "#555" 
},
});

export default styles;
