import { connect } from 'react-redux'
import React, { Component } from 'react';
import {
  Text,
  Image,
  Slider,
  TouchableOpacity,
  View
} from 'react-native'
import { Icon, Button, Spinner } from 'native-base'



class UI extends Component {
    componentWillMount() {
        this.props.getDetails()
    }

    getSeconds(duration) {
        if(duration % 60 < 10) {
            return '0' + duration % 60
        } else {
            return duration 
        }
    }

    render(){
        return (
            <View style={{flex:1}}>
                <View style={{backgroundColor:'#957c79',flex:1,flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                    <Button transparent style={{flex:1,paddingTop:20}}><Icon name='md-arrow-back' style={{color:'white'}}/></Button>
                    <Text style={{flex:9,fontSize:20,color:'white'}}>Trucker Radio</Text>
                </View>
                {this.props.details ? 
                <View style={{flex:9,backgroundColor:'white'}}>
                    <View style={{flex:7,justifyContent:'center',alignItems:'center'}}>
                    <Image style={{width: 250, height: 250}} source={{uri: this.props.details.cover}}/>
                    <Text style={{width:200,textAlign:'center',fontSize:16,color:'black',paddingTop:10}}>{this.props.details.title}</Text>
                    <Text style={{paddingTop:5}}>{this.props.details.artist}</Text>
                    </View>
                    <View style={{flex:3}}>
                    <View style={{flex:3}}>
                        <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:10,paddingLeft:10,paddingRight:10}}>
                            <Text style={{fontSize:10}}>0:00</Text>
                            <Text style={{fontSize:10}}>{Math.floor(this.props.details.duration/60) + ':' + this.getSeconds(this.props.details.duration)}</Text>
                        </View>
                        <Slider minimumValue={0.00} maximumValue={63.00} step={0.1}/>
                    </View>
                    <View style={{flex:7,paddingLeft:100,flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
                        <TouchableOpacity style={{justifyContent:'center'}}>
                            <Icon style={{fontSize:40,color:'#57c7e5'}} name='md-skip-backward'/>
                        </TouchableOpacity>
                        <TouchableOpacity style={{backgroundColor:'#57c7e5',justifyContent:'center',width:50,height:50,alignItems:'center'}}>
                            <Icon style={{fontSize:40,color:'white'}} name='md-play'/>
                        </TouchableOpacity>
                        <TouchableOpacity style={{justifyContent:'center'}}>
                            <Icon style={{fontSize:40,color:'#57c7e5'}} name='md-skip-forward'/>
                        </TouchableOpacity>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <TouchableOpacity style={{justifyContent:'center'}}>
                                <Icon style={{fontSize:30,color:'grey'}} name='ios-thumbs-up-outline'/>
                            </TouchableOpacity>
                            <Text style={{color:'black',padding:5}}>{this.props.details.likes}</Text>
                        </View>
                    </View>
                    </View>
                </View> : <Spinner /> }
            </View>
        )
    }
}

const mapStateToProps = (state) => ({ details: state }); 

const mapDispatchToProps = (dispatch) => ({ getDetails: () => dispatch({type:'LOAD_USER_DETAILS'}) }) 

export default connect(mapStateToProps,mapDispatchToProps)(UI);