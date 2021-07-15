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
import QRCode from "qrcode.react"
import PropTypes from "prop-types"
import moment from "moment"
import { Base64 } from "js-base64"

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#fefefe",
    fontSize: 18,
    padding: 10,
  },
  section: {
    padding: 10,
    textAlign: "center",
    margin: 10,
    maxWidth: 500,
  },
  image: {
    width: 10,
    height: 10,
  },
})

const PdfDocument = ({ expirationDate, promocode }) => {
  const QRConverted = Base64.encode(
    <QRCode
      value={promocode}
      renderAs="svg"
      size={128}
      level={"H"}
      fgColor="#333"
      bgColor="#fff"
      src="/promocode"
    />
  )
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>
            Congrats on your choice! Your promocode name is {promocode}
          </Text>
        </View>
        <View style={styles.image}>
          <Image
            src={`data:image/png;base64,${QRConverted}`}
          />
        </View>
        <View style={styles.section}>
          <Text>
            Hurry up! The expiration date is{" "}
            {moment(expirationDate).format("MMM Do YYYY")}
          </Text>
        </View>
        <View style={styles.section}>
          <Text>Address: Ukraine, Lviv, Chornovola Str 25 </Text>
        </View>
      </Page>
    </Document>
  )
}

export default PdfDocument

PdfDocument.propTypes = {
  expirationDate: PropTypes.string,
  promocode: PropTypes.string,
  promocodeUrl: PropTypes.string,
}
