import React, {Component} from "react";
import {Dimensions, Keyboard, Text, View} from "react-native";
import {BUTTON_TYPE} from "../../../shared/components/button/button.constants";
import GpButton from "../../../shared/components/button/button.component";
import GpInput from "../../../shared/components/input/input.component";
import {GpInputProps} from "../../../shared/components/input/input.model";
import {genericStyle} from "../../../styles/generic.style";

const {width, height} = Dimensions.get('window');

export default class Login extends Component<any> {

    public state: { containerHeight: number, emailValue: string, passwordValue: string } = {
        containerHeight: height,
        emailValue: "",
        passwordValue: ""
    };

    constructor(props: GpInputProps) {
        super(props);
    }

    private onKeyboardShow(event: any): void {
        if (event?.endCoordinates) {
            this.setState({containerHeight: height - event.endCoordinates.height});
        }
    }

    private onKeyboardHide(event: any): void {
        if (event?.endCoordinates) {
            this.setState({containerHeight: height - event.endCoordinates.height});
        }
    }

    onChangeEmailValue = value => this.setState({...this.state, emailValue: value});

    onChangePasswordValue = value => this.setState({...this.state, passwordValue: value});

    componentDidMount = async () => {
        Keyboard.addListener('keyboardDidShow', this.onKeyboardShow.bind(this));
        Keyboard.addListener('keyboardDidHide', this.onKeyboardHide.bind(this));
    };

    componentWillUnmount = async () => {
        Keyboard.removeAllListeners();
    };

    render() {
        return (
            <View style={genericStyle.container}>
                <View style={{
                    paddingBottom: height - this.state.containerHeight,
                    marginLeft: width * 0.1,
                    marginRight: width * 0.1
                }}>
                    <View style={{
                        flex: 1,
                        justifyContent: "flex-end",
                    }}>
                        <View style={{
                            flex: 0,
                            alignItems: "center",
                            marginBottom: 20
                        }}>
                            <GpInput value={this.state.emailValue}
                                     onChangeValue={this.onChangeEmailValue}
                                     label="Adres e-mail"/>
                        </View>
                        <Text>{this.state.emailValue}</Text>
                        <GpInput value={this.state.passwordValue}
                                 onChangeValue={this.onChangePasswordValue}
                                 secureTextEntry={true}
                                 label="Hasło"/>
                    </View>
                    <View style={{
                        flexDirection: "row",
                        flexWrap: "nowrap",
                        flex: 1
                    }}>
                        <GpButton type={BUTTON_TYPE.SECONDARY}
                                  width={width * 0.35}
                                  content={"Powrót"}
                                  onPress={() => this.props.navigation.navigate('Start')}/>
                        <GpButton type={BUTTON_TYPE.PRIMARY}
                                  width={width * 0.35}
                                  content={"Zaloguj się"}
                                  onPress={() => this.props.navigation.navigate('Start')}/>
                    </View>
                </View>
            </View>
        );
    }

}
