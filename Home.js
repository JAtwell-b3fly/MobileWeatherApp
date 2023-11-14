import React, {useState, useEffect} from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform, Alert } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const api = {
    key: "6f74fa6463c20d5b88cdaaf7e08d7fa8",
    base: "https://api.openweathermap.org/data/2.5/"
  }

const Home = () => {
    const navigation = useNavigation();

    const [query, setQuery] = useState("");
    const [weather, setWeather] = useState({});
    const [hourlyForecast, setHourlyForecast] = useState([]);
    const [dailyForecast, setDailyForecast] = useState([]);
    const [currentDate, setCurrentDate] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [toggle, setToggle] = useState("Today");

    const toggleSelect = (daysLength) => {
        setToggle(daysLength);
    }

    useEffect(() => {
        console.log("weather: ", weather)
    })

    const search = () => {
        setIsLoading(true);

        // Fetch current weather data
        fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
          .then(res => res.json())
          .then(result => {
            setWeather(result);
            setQuery("");
            console.log("Weather: ", result);
      
            // Fetch hourly forecast data
            fetch(`${api.base}onecall?lat=${result.coord.lat}&lon=${result.coord.lon}&exclude=current,minutely,daily&units=metric&appid=${api.key}`)
              .then(res => res.json())
              .then(hourlyResult => {
                setHourlyForecast(hourlyResult.hourly);
                console.log("Hourly Forecast: ", hourlyResult.hourly);
              })
              .catch(error => {
                console.error("Error fetching hourly forecast data: ", error);
              });
      
            // Fetch daily forecast data
            fetch(`${api.base}onecall?lat=${result.coord.lat}&lon=${result.coord.lon}&exclude=current,minutely,hourly&units=metric&appid=${api.key}`)
              .then(res => res.json())
              .then(dailyResult => {
                setDailyForecast(dailyResult.daily);
                console.log("Daily Forecast: ", dailyResult.daily);
              })
              .catch(error => {
                console.error("Error fetching daily forecast data: ", error);
              });
          })
          .catch((error) => {
            console.error("Error fetching current weather data: ", error);
          })
          .finally(() => {
            setIsLoading(false);
          });
    }

    const dateFunction = (dF) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        
        let day = days[dF.getDay()];
        let date = dF.getDate();
        let month = months[dF.getMonth()];
        let year = dF.getFullYear();

        return `${day} ${date} ${month} ${year}`
    }

    const getFormattedTime = (timestamp) => {
        const date = new Date(timestamp * 1000);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
    }

    useEffect(() => {
        setCurrentDate(dateFunction(new Date()));
    }, [])

    return(
        <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -100} // Adjust the offset as needed
>
        <ScrollView style={styles.main}>
          
            <View style={styles.searchbar}>
                <TextInput style={styles.search} value={query} placeholder="Search for city" placeholderTextColor="rgb(238, 238, 238)" onChangeText={(text) => setQuery(text)} />

                <TouchableOpacity onPress={search}>
                    <AntDesign name="search1" size={24} color="black"  style={{padding: 10, color: "rgb(238, 238, 238)"}} />
                </TouchableOpacity>
            </View>
           
            {weather.main? (
            <>
            <ScrollView style={{marginTop: 70}}>
                <View style={styles.dateSection}>
                    <Text style={styles.dateSectionText}>{currentDate}</Text>
                </View>

            <View style={styles.todayTempSection}>
                <View style={{flexDirection: "column"}}>
                    <Text style={styles.temperature}>{Math.round(weather.main.temp)}°</Text>

                    <Text style={styles.weatherLikelihood}>{weather.weather[0].description}</Text>
                </View>

                {weather.weather[0].description === "clear sky" ? (
                <>
                    <Image style = {styles.weather_icon} source={require("./assets/sun.png")}resizeMode="contain"/>
                </>): null}
                <Image style = {styles.weather_icon} source={require("./assets/thunderstorm.png")}resizeMode="contain"/>
            </View>

            <View style={styles.MainFeaturesSection}>
                <View style={styles.wind}>
                    <Image style={styles.featuresIcon} source={require("./assets/windy.png")} resizeMode="contain" />

                    <Text style={styles.featuresAmount}>{Math.round(weather.wind.speed)} m/s</Text>

                    <Text style={styles.feature}>Wind</Text>
                </View>

                <View style={styles.wind}>
                    <Image style={styles.featuresIcon} source={require("./assets/water.png")} resizeMode="contain" />

                    <Text style={styles.featuresAmount}>{weather.main.humidity}%</Text>

                    <Text style={styles.feature}>Humidity</Text>
                </View>

                <View style={styles.wind}>
                    <Image style={styles.featuresIcon} source={require("./assets/umbrella.png")} resizeMode="contain" />

                    <Text style={styles.featuresAmount}>{weather.rain ? weather.rain["1h"]: 0} mm</Text>

                    <Text style={styles.feature}>Rain</Text>
                </View>
            </View>

            <View style={{ flexDirection: "row", marginLeft: 30, marginBottom: 10}}>
                <TouchableOpacity style={{ flexDirection: "column", marginRight: 20}} onPress={() => toggleSelect("Today")}>
                    {toggle === "Today" ? (
                        <>
                            <Text style={styles.toggle_text_selected}>Today</Text>
                            <Text style={styles.toggle_text_selected}>.</Text>
                        </>
                        )
                        : 
                        (
                            <>
                                <Text style={styles.toggle_text}>Today</Text>
                            </>
                        )}
                    
                </TouchableOpacity>

                <TouchableOpacity style={{ flexDirection: "column", marginRight: 20}} onPress={() => toggleSelect("Tomorrow")}>
                    {toggle === "Tomorrow" ? (
                        <>
                            <Text style={styles.toggle_text_selected}>Tomorrow</Text>
                            <Text style={styles.toggle_text_selected}>.</Text>
                        </>
                    ):
                    (
                        <>
                            <Text style={styles.toggle_text}>Tomorrow</Text>
                        </>
                    )}
                    
                </TouchableOpacity>

                <TouchableOpacity style={{ flexDirection: "column"}} onPress={() => navigation.navigate("TenDays")}>
                    <Text style={styles.toggle_text}>Next 10 days</Text>
                </TouchableOpacity>
            </View>

            <View style={{height: "150"}}>
            <ScrollView style={{height: "auto", marginLeft: 15}} horizontal>
                {toggle === "Today" && weather.hourly && (
                    <>
                    {weather.hourly.map((hourData, index) => (
                        <>
                    <View key = {index} style={styles.hourTempView}>
                    <Text style={styles.time}>{getFormattedTime(hourData.dt)}</Text>

                    {hourData.temp > 20 ? (
                        <>
                            <Image style={styles.hourlyTempImage} source={require("./assets/sun.png")} resizeMode="contain"/>
                        </>
                    ):(
                        <>
                            <Image style={styles.hourlyTempImage} source={require("./assets/cloud.png")} resizeMode="contain"/>
                        </>
                    )}
                    

                    <Text style={styles.hourlyTemp}>{Math.round(hourData.temp)}°</Text>
                    </View>

                    </>
                    ))} 
                </>
                )}

                {toggle === "Tomorrow" && (
                    <>
                    <View style={styles.hourTempView}>
                    <Text style={styles.time}>10 am</Text>

                    <Image style={styles.hourlyTempImage} source={require("./assets/sun.png")} resizeMode="contain"/>

                    <Text style={styles.hourlyTemp}>16°</Text>
                </View>

                <View style={styles.hourTempView}>
                    <Text style={styles.time}>10 am</Text>

                    <Image style={styles.hourlyTempImage} source={require("./assets/sun.png")} resizeMode="contain"/>

                    <Text style={styles.hourlyTemp}>16°</Text>
                </View>

                <View style={styles.hourTempView}>
                    <Text style={styles.time}>10 am</Text>

                    <Image style={styles.hourlyTempImage} source={require("./assets/sun.png")} resizeMode="contain"/>

                    <Text style={styles.hourlyTemp}>16°</Text>
                </View>

                <View style={styles.hourTempView}>
                    <Text style={styles.time}>10 am</Text>

                    <Image style={styles.hourlyTempImage} source={require("./assets/sun.png")} resizeMode="contain"/>

                    <Text style={styles.hourlyTemp}>16°</Text>
                </View>

                <View style={styles.hourTempView}>
                    <Text style={styles.time}>10 am</Text>

                    <Image style={styles.hourlyTempImage} source={require("./assets/sun.png")} resizeMode="contain"/>

                    <Text style={styles.hourlyTemp}>16°</Text>
                </View>

                <View style={styles.hourTempView}>
                    <Text style={styles.time}>10 am</Text>

                    <Image style={styles.hourlyTempImage} source={require("./assets/sun.png")} resizeMode="contain"/>

                    <Text style={styles.hourlyTemp}>16°</Text>
                </View>

                <View style={styles.hourTempView}>
                    <Text style={styles.time}>10 am</Text>

                    <Image style={styles.hourlyTempImage} source={require("./assets/sun.png")} resizeMode="contain"/>

                    <Text style={styles.hourlyTemp}>16°</Text>
                </View>
                </>
                )}
            </ScrollView>
            </View>

            <Image style={styles.mainImage} source={require("./assets/dark-wallpaper.jpg")} resizeMode="cover" />
            </ScrollView>
            </>
            ): (
            <>
              <Image style={styles.defaultWallpaper} source={require("./assets/default1.jpg")} resize="contain" />
            </>
            )}

            {isLoading ? (
            <>
                <Image resizeMode="cover" style={styles.loader} source={require("./assets/loader.gif")} />
                <Text style={styles.loaderText}>Fetching weather data...</Text>
            </>
            ): null}
            
            
        </ScrollView>
        </KeyboardAvoidingView>

    )
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        textAlign: "center",
        backgroundColor: "rgb(34, 40, 49)",
        paddingTop: 25,
    },
    searchbar: {
        flexDirection: "row",
        marginLeft: 20,
        marginTop: 20,
        backgroundColor:"rgb(57, 62, 70)",
        marginRight: 20,
        borderRadius: 50,
        zIndex: 1,
        position: "absolute",
    },
    search: {
        width: 300,
        height: "auto",
        marginRight: 20,
        fontSize: 18,
        padding: 10,
        color: "rgb(238, 238, 238)",
    },
    dateSection: {
        width: "auto",
        height: "auto",
        marginLeft: 30,
        marginRight: 20,
        marginTop: 10,
    },
    dateSectionText: {
        color: "rgb(238, 238, 238)",
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: "100",
    },
    todayTempSection: {
        height: 150,
        marginTop: 10,
        marginBottom: 10,
        flexDirection: "row",
        padding: 20,
        paddingLeft: 40
    },
    temperature: {
        fontWeight: "900",
        color: "rgb(238, 238, 238)",
        fontSize: 60,
        justifyContent: "center",
        textAlign: "justify",
    },
    weatherLikelihood: {
        fontWeight: "100",
        fontSize: 16,
        fontStyle: "normal",
        color: "rgb(238, 238, 238)",
    },
    weather_icon: {
        width: "100%",
        height: "100%",
    },
    MainFeaturesSection: {
        width: 370,
        height: 150,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        borderRadius: 50,
        backgroundColor: "rgb(57, 62, 70)",
        flexDirection: "row",
        padding: 18,
        paddingLeft: 25,
    },
    wind: {
        padding: 15,
        marginLeft: 10,
        marginRight: 10,
    },
    featuresIcon: {
        width: 40,
        height: 40,
        justifyContent: "center",
        marginBottom: 10,
    }, 
    featuresAmount: {
        color: "rgb(238, 238, 238)",
        fontWeight: "800",
        fontSize: 16,
        textAlign: "center",
    },
    feature: {
        textAlign: "center",
        fontStyle: "normal",
        fontWeight: "100",
        color: "rgb(238, 238, 238)"
    },
    toggle_text_selected: {
        color: "rgb(238, 238, 238)",
        fontSize: 16,
        textAlign: "center",
    },
    toggle_text: {
        color: "rgb(238, 238, 238)",
        fontSize: 16,
        textAlign: "center",
        fontWeight: "100",
    },
    hourTempView: {
        width: 100,
        height: 150,
        justifyContent: "center",
        textAlign: "center",
        padding: 20,
        backgroundColor: "rgb(57, 62, 70)",
        borderRadius: 30,
        marginRight: 20,
    },
    time: {
        fontSize: 15,
        fontStyle: "normal",
        fontWeight: "100",
        textAlign: "center",
        marginBottom: 10,
        color: "rgb(238, 238, 238)"
    },
    hourlyTempImage: {
        width: 40,
        height: 40,
        justifyContent: "center",
        marginBottom: 10,
        marginLeft: 10,
    },
    hourlyTemp: {
        fontSize: 15,
        fontWeight: "700",
        textAlign: "center",
        color: "rgb(238, 238, 238)"
    },
    mainImage: {
        width: "95%",
        height: 160,
        marginTop: 20,
        borderRadius: 20,
        marginRight: 20,
        marginLeft: 10
    },
    defaultWallpaper: {
        width: "100%",
        height: 840,
    },
    loader: {
        position: "absolute",
        zIndex: 1,
        width: "auto",
        height: "auto"
    },
    loaderText: {
        color: "rgb(238,238,238)",
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: "100",
    }
})

export default Home;