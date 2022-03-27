import React from 'react';
import{
    SafeAreaView,
    Text,
    View,
    Image,
    ScrollView,
    FlatList,
}from 'react-native';
import {Icon,Card} from 'react-native-elements';
import {useRoute} from '@react-navigation/native';
import {Maskapai,Bandara,Jadwal} from '../data/dataPenerbangan';

const searchPage = ({navigation}) => {
    const route = useRoute();
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.row}>
                    <Icon name='arrow-back' size={50} onPress={() => navigation.goBack()}/>
                    <Icon name='account-circle' size={50}/>
                </View>
                <View style={styles.BagianAtas}>
                    <Text style={styles.teksTittle}>Hiling.id</Text>
                    <Text style={styles.teksSub}>Hasil Pencarian Penerbangan</Text>
                    <Text style={styles.teksSub}>(Tanggal Keberangkatan)</Text>
                </View>
                <View style={styles.merge}>
                    <FindData/>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

function noData(){
    return (
        <card>
            <View style={styles.cardShow}>
                <Text style={styles.teksSub}>Hasil pencarian tidak ditemukan</Text>
            </View>
        </card>
    );
}

function gotData (hasil){
    return(
        <FlatList
                data = {hasil}
                renderItem={({item}) => (
                    <Card>
                    <View style={styles.cardShow}>
                        <View style={styles.showImage}>
                            <Text>{Bandara.find(sub => sub.bandara_id == item.bandara_id_keberangkatan).bandara_nama}</Text>
                         </View>
                        <Text>{Bandara.find(sub => sub.bandara_id === item.bandara_id_kedatangan).bandara_nama}</Text>
                    </View>
                        <View style={styles.cardShow}>
                            <View style={styles.showImage}>
                                 <Image source={Maskapai.find(sub => sub.maskapai_id === item.maskapai_id).maskapai_logo} style={{ width: 40, height: 40 }}/>
                            </View>
                            <Text>{Maskapai.find(sub => sub.maskapai_id === item.maskapai_id).maskapai_nama}</Text>
                    </View>
                    </Card>
                )}
                keyExtractor={item => item.jadwal_id}
            />
    );
};

function findData(){
    if (route.params.keberangkatan === '' || route.params.tujuan === '' || route.params.waktu === ''){
        return noData();
    } else {
        const keberangkatanID = Bandara.find(id => id.bandara_nama.toLowerCase() === route.params.keberangkatan.toLowerCase()).bandara_id;
        const tujuanID = Bandara.find(id => id.bandara_nama.toLowerCase() === route.params.tujuan.toLowerCase()).bandara_id;
        const hasil = Jadwal.filter(id => id.bandara_id_keberangkatan.toLowerCase() === keberangkatanID.toLowerCase() && id.bandara_id_kedatangan.toLowerCase() === tujuanID.toLowerCase() && id.tanggal === route.params.waktu.toLowerCase());

        let findAll = (hasil.length  1) ? gotData(hasil) : noData();

        return findAll;
    }
}
    

const styles = StyleSheet.create({
    row: {
        flexDirection : "row",
        justifyContent: 'space-between',
        backgroundColor: 'rgb(107, 112, 92)',
    },
    BagianAtas: {
        alignItems: 'center',
        backgroundColor: 'rgb(107, 112, 92)',
        height: 150,
    },
    teksTittle: {
        fontSize: 32,
        fontWeight: "bold",
        color: 'black',
    },
    teksSub: {
        fontWeight: "bold",
        fontSize: 16,
        color: 'black',
    },
    cardShow: {
        padding: 10,
        flexDirection: "row",
    },
    merge: {
        marginVertical: 20,
        marginHorizontal: 10,
    },
    showImage: {
        flex: 1,
    }


})

export default searchPage;