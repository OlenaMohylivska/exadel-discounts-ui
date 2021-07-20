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
// import QRCode from "qrcode.react"
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
    padding: 10
  },
})

const PdfDocument = ({ expirationDate, discountName }) => {
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
        {/* {locations && locations.length > 0 ? (
          <View style={styles.section}>
            (<Text style={styles.locationItem}>{locations[0]}</Text>
            <Text style={styles.locationItem}>
              {locations[1] && locations[1]}
            </Text>
            <Text style={styles.locationItem}>
              {locations[2] && locations[2]}
            </Text>
            <Text style={styles.locationItem}>
              {locations[3] && locations[3]}{" "}
            </Text>
          </View>
        ) : (
          "Please check the address at discount provider website"
        )} */}
      </Page>
    </Document>
  )
}

export default PdfDocument

PdfDocument.propTypes = {
  expirationDate: PropTypes.string,
  discountName: PropTypes.string,
}
