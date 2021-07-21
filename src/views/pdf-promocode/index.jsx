import React from "react"
import "./styles.scss"
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer"
import PropTypes from "prop-types"
import moment from "moment"
import promocode from "../../assets/promocode.jpg"

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#fefefe",
    alignItems: "center",
    fontSize: 18,
    padding: 10,
  },
  section: {
    padding: 10,
    alignItems: "center",
    margin: 10,
    maxWidth: 500,
  },
  locationItem: {
    marginTop: 5,
    fontSize: 14,
    alignItems: "center",
  },
  image: {
    width: "50%",
    padding: 10,
  },
})

const PdfDocument = ({ expirationDate, discountName, addresses }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>
            Congrats on your choice! Your discount name is {discountName}
          </Text>
        </View>
        <View style={styles.section}>
          <Image style={styles.image} src={promocode} />
        </View>
        <View style={styles.section}>
          <Text>
            Hurry up! The expiration date is{" "}
            {moment(expirationDate).format("MMM Do YYYY")}
          </Text>
        </View>
        <View style={styles.section}>
          <Text>Check address down below:</Text>
        </View>
        <View style={styles.section}>
          <Text>{addresses}</Text>
        </View>
      </Page>
    </Document>
  )
}

export default PdfDocument

PdfDocument.propTypes = {
  expirationDate: PropTypes.string,
  discountName: PropTypes.string,
  addresses: PropTypes.string,
}
