import {gql} from "@apollo/client";


export const LOGIN_USER_INFO = gql`
    query adminLoginInfo{
        adminLoginInfo{
            code
            status
            message
            data{
                token
                permission
                allAvailablePermissions
                organization
                user{
                    id
                    name
                    email
                    phone
                    first_name
                    last_name
                    about_me
                    user_role
                    isOrganizationMember
                    organization_users{
                        id
                        customRoleName
                        organization{
                            id
                            name
                            identifier
                            api_key
                            about_logo
                            admin_logo
                            coin_image
                            coin_text
                        }
                    }
                    profile{
                        id
                        avatar_url
                    }
                }
            }
        }
    }
`;
 
