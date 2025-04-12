import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  header: {
    alignSelf: "center",
    justifyContent: "center",
    fontSize: 32,
    marginBottom: 32,
    fontWeight: "bold",
    color: "#FF8600",
  },
  title: {
    fontSize: 22,
    marginBottom: 15,
    textAlign: "left",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 12,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#FF8600",
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  linkText: {
    color: "#1B9AAA",
    marginTop: 20,
    textAlign: "center",
  },
});

export default styles;
