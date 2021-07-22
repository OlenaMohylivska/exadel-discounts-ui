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
import exadelLogo from "../../assets/exadelLogo.png"

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
    margin: 5,
    maxWidth: 500,
  },
  location: {
    marginTop: 5,
    fontSize: 14,
    alignItems: "center",
    color: "#2061A5"
  },
  image: {
    width: "40%",
    padding: 10,
  },
  logo: {
    position: "fixed",
    bottom: 0,
    right: 0,
    width: "20%",
  },
  address: {
    marginBottom: 3

  }
})

const PdfDocument = ({
  expirationDate,
  discountName,
  fullAddressLocations,
  QrCode,
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Image style={styles.image} src={promocode} />
        </View>
        <View style={styles.section}>
          <Text>
            Congrats on your choice! Your discount name is {discountName}
          </Text>
        </View>
        <View style={styles.section}>
          <Image style={styles.image} src={QrCode} />
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
        <View style={styles.location}>
          {fullAddressLocations &&
            fullAddressLocations.map((address, index) => (
              <Text style={styles.address} key={index}>{address}</Text>
            ))}
        </View>
        <View style={styles.section}>
          <Image style={styles.logo} src={exadelLogo} />
        </View>
      </Page>
    </Document>
  )
}

export default PdfDocument

PdfDocument.propTypes = {
  expirationDate: PropTypes.string,
  discountName: PropTypes.string,
  fullAddressLocations: PropTypes.string,
  QrCode: PropTypes.string,
}
