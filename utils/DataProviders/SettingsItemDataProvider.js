import { SetGoalIcon, DeleteIcon, VideoTutorialIcon, PrivacyPolicyIcon } from './../../components/UI/ICONS/icons'

class SettingsItemDataProvider {
    constructor() {
        this.data = [
            // {
            //     icon: SetGoalIcon,
            //     title: 'Ziel setzen',
            //     screenName: 'SetGoal',
            //     id: '1'
            // },
            // {
            //     icon: VideoTutorialIcon,
            //     title: 'Videoanleitung',
            //     screenName: 'VideoTutorial',
            //     id: '2'
            // },
            // {
            //     icon: PrivacyPolicyIcon,
            //     title: 'Datenschutz-Bestimmungen',
            //     screenName: 'DeleteProfile',
            //     id: '3'
            // },
            // {
            //     icon: DeleteIcon,
            //     title: 'Konto Loschen',
            //     screenName: 'DeleteProfile',
            //     id: '3'
            // },
        ]
    }

    getData() {
        return this.data
    }
}

export default SettingsItemDataProvider