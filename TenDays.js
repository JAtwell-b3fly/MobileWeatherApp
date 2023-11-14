import React from "react";
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Image, Slider } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";


const TenDays = () => {
    const navigation = useNavigation();

    return(
        <View style={styles.main}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                    <AntDesign name="arrowleft" size={34} color="rgb(238, 238, 238)" style={{marginRight: 95, backgroundColor: "rgba(57, 62, 70, 0.4)", borderRadius: 50, padding: 5}} />
                </TouchableOpacity>

                <Text style={styles.location}>Kimberley</Text>
            </View>

            <View style={styles.mainTemp}>
                <Text style={styles.temperature}>21°</Text>
                <View style={{flexDirection: "row", justifyContent: "center"}}>
                    <Text style={styles.mainFeatureText}>Cloudy</Text>

                    <Image resizeMode="contain" style={styles.mainFeature} source={require("./assets/thunderstorm.png")} />
                </View>
            </View>

            <View style={styles.perks}>
                <View style={styles.extraWeatherDiv}>
                    <Image style={styles.extraWeatherIcon} resizeMode="contain" source={require("./assets/windy.png")} />

                    <Text style={styles.extraWeatherInfo}>10 m/s</Text>

                    <Text style={styles.extraWeatherType}>Wind</Text>
                </View>

                <View style={styles.extraWeatherDiv}>
                    <Image style={styles.extraWeatherIcon} resizeMode="contain" source={require("./assets/water.png")} />

                    <Text style={styles.extraWeatherInfo}>98%</Text>

                    <Text style={styles.extraWeatherType}>Humidity</Text>
                </View>

                <View style={styles.extraWeatherDiv}>
                    <Image style={styles.extraWeatherIcon} resizeMode="contain" source={require("./assets/umbrella.png")} />

                    <Text style={styles.extraWeatherInfo}>100%</Text>

                    <Text style={styles.extraWeatherType}>Rain</Text>
                </View>
            </View>

            <View style={{height: 390}}>
                <ScrollView style={{height: "auto", marginLeft: 10, marginRight: 10}}>
                    <View style={styles.dayDiv}>
                        <Text style={styles.day}>Today</Text>

                        <View style={styles.dayTempDiv}>
                            <Text style={styles.minTemp}>13°</Text>

                            <View style={styles.slider} />

                            <Text style={styles.maxTemp}>22°</Text>
                        </View>

                        <Image resizeMode="contain" style={styles.dayTypeIcon} source={require("./assets/thunderstorm.png")} />
                    </View>
                    
                    <View style={styles.dayDiv}>
                        <Text style={styles.day}>Tomorrow</Text>

                        <View style={styles.dayTempDiv}>
                            <Text style={styles.minTemp}>13°</Text>

                            <View style={styles.slider} />

                            <Text style={styles.maxTemp}>22°</Text>
                        </View>

                        <Image resizeMode="contain" style={styles.dayTypeIcon} source={require("./assets/thunderstorm.png")} />
                    </View>

                    <View style={styles.dayDiv}>
                        <Text style={styles.day}>Wednesday</Text>

                        <View style={styles.dayTempDiv}>
                            <Text style={styles.minTemp}>13°</Text>

                            <View style={styles.slider} />

                            <Text style={styles.maxTemp}>22°</Text>
                        </View>

                        <Image resizeMode="contain" style={styles.dayTypeIcon} source={require("./assets/thunderstorm.png")} />
                    </View>

                    <View style={styles.dayDiv}>
                        <Text style={styles.day}>Thursday</Text>

                        <View style={styles.dayTempDiv}>
                            <Text style={styles.minTemp}>13°</Text>

                            <View style={styles.slider} />

                            <Text style={styles.maxTemp}>22°</Text>
                        </View>

                        <Image resizeMode="contain" style={styles.dayTypeIcon} source={require("./assets/thunderstorm.png")} />
                    </View>

                    <View style={styles.dayDiv}>
                        <Text style={styles.day}>Friday</Text>

                        <View style={styles.dayTempDiv}>
                            <Text style={styles.minTemp}>13°</Text>

                            <View style={styles.slider} />

                            <Text style={styles.maxTemp}>22°</Text>
                        </View>

                        <Image resizeMode="contain" style={styles.dayTypeIcon} source={require("./assets/thunderstorm.png")} />
                    </View>

                    <View style={styles.dayDiv}>
                        <Text style={styles.day}>Saturday</Text>

                        <View style={styles.dayTempDiv}>
                            <Text style={styles.minTemp}>13°</Text>

                           
                                <View style={styles.slider} />
                           

                            <Text style={styles.maxTemp}>22°</Text>
                        </View>

                        <Image resizeMode="contain" style={styles.dayTypeIcon} source={require("./assets/thunderstorm.png")} />
                    </View>
                </ScrollView>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: "center",
        textAlign: "center",
        backgroundColor: "rgb(34, 40, 49)"
    },
    header: {
        marginLeft: 10,
        marginRight: 20,
        justifyContent: "center",
        flexDirection: "row",
    },
    location: {
        fontSize: 25,
        fontWeight: "900",
        textAlign: "center",
        color: "rgb(238, 238, 238)",
        marginRight: 90,
    },
    mainTemp: {
        justifyContent: "center",
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        marginBottom: 20,
    },
    temperature: {
        color: "rgb(238, 238, 238)",
        textAlign: "center",
        fontSize: 70,
        fontWeight: "900",
    },
    mainFeatureText: {
        color: "rgb(238, 238, 238)",
        textAlign: "center",
        fontWeight: "100",
        marginTop: 20,
        fontSize: 18
    },
    mainFeature: {
        width: 30,
        height: 30,
        marginLeft: 20,
        marginTop: 20,
    },
    perks: {
        marginLeft: 20,
        marginRight: 20,
        padding: 20,
        borderRadius: 50,
        backgroundColor: "rgba(57, 62, 70)",
        height: 120,
        width: "auto",
        flexDirection: "row",
        marginTop: 20,
        marginBottom: 20,
    },
   extraWeatherDiv: {
        justifyContent: "center",
        marginRight: 10,
        padding: 20
   },
   extraWeatherIcon: {
        width: 30,
        height: 30,
        marginBottom: 5,
        marginLeft: 12
   },
   extraWeatherInfo: {
        color: "rgb(238, 238, 238)",
        textAlign: "center",
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 5,
   },
   extraWeatherType: {
        color: "rgb(238, 238, 238)",
        fontSize: 15,
        fontWeight: "100",
        textAlign: "center",
   },
   dayDiv: {
        flexDirection: "row",
        height: "auto",
        width: "100%",
        marginBottom: 18,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 20,
   },
   day: {
        color: "rgb(238, 238, 238)",
        fontWeight: "500",
        fontSize: 16,
        textAlign: "left",
        width: 145,
   },
   dayTempDiv: {
        justifyContent: "center",
        flexDirection: "row",
        width: 100,
        marginRight: 20,
   },
   minTemp: {
        color: "rgb(238, 238, 238)",
        fontSize: 16,
        fontWeight: "100",
        marginRight: 20,
        textAlign: "center",
   },
   maxTemp: {
        color: "rgb(238, 238, 238)",
        fontSize: 16,
        textAlign: "center",
        fontWeight: "500"
   },
   slider: {
        backgroundColor: "rgb(0, 173, 181)",
        height: 10,
        width: "100%",
        marginRight: 20,
        borderRadius: 50,
        marginTop: 10,
   },
   gradientContainer: {
        flex: 1,
   },
   dayTypeIcon: {
        width: 30,
        height: 30,
        marginLeft: 50,
   }
});

export default TenDays;
