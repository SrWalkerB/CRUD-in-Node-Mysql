const { validationResult } = require("express-validator");
const moment = require("moment");
const knex_Database = require("../Database/KnexDatabase/knex_Database");
const { cruptografar_password } = require("../utils/cryptografar_Password");


module.exports = {

    list: async (Request, Response) => {

        try {

            const consult = await knex_Database("tb_users");

            const info_tratada = consult.map(result => {

                moment.locale("pt-br");
                const data_formatada = moment(result.created_at).format("LLL");

                return {
                    id_user: result.id_user,
                    name: result.name,
                    surname: result.surname,
                    email: result.email,
                    password: result.password,
                    accont_create: data_formatada
                }
            })
            

            return Response.status(200).json(info_tratada)
            
        } catch (error) {
            
            return Response.status(404).json({ erros: error });
        }
    },

    list_id: async (Request, Response) => {
        
        try {
            
            const { id } = Request.params;
            
            const consult = await knex_Database("tb_users").where("id_user", id);


            if(consult != 0){

                const info_tratada = consult.map(result => {

                    moment.locale("pt-br");
                    const data_formatada = moment(result.created_at).format("LLL");
    
                    return {
                        id_user: result.id_user,
                        name: result.name,
                        surname: result.surname,
                        email: result.email,
                        password: result.password,
                        accont_create: data_formatada
                    }
                })

                return Response.status(200).json(info_tratada);
                
            } else{

                return Response.status(500).json({ status: false, result: "User not found" });
            }

        } catch (error) {
            
            return Response.status(500).json({ erros: error });
        }
    },

    create_user: async (Request, Response) => {

        try {
            
            const { name, surname, email, password } = Request.body;

            //Express-Validation get erros
            const erros = validationResult(Request);

            if(!erros.isEmpty()){

                return Response.status(400).json({ erros: `${erros.array()[0].param}: ${erros.array()[0].msg}`})
            }

        
            const password_cryptografado = await cruptografar_password(password);


            const insert_data = await knex_Database("tb_users").insert({

                name: name,
                surname: surname,
                email: email,
                password: password_cryptografado

            }).then(resp => {
                return resp;
            })


            if(insert_data != 0){

                return Response.status(201).json({ status: true, user_create: "create" });

            } else{

                return Response.status(201).json({ status: true, user_create: insert_data });
            }



        } catch (error) {
            
            return Response.status(500).json({ erros: error });
        }
    },

    update_user: async (Request, Response) => {

        try {

            const { id } = Request.params;
            const { name, surname, email, password } = Request.body;


            //Express-Validation get erros
            const erros = validationResult(Request);

            if(!erros.isEmpty()){

                return Response.status(400).json({ erros: `${erros.array()[0].param}: ${erros.array()[0].msg}`})
            }


            let password_cryptografado = undefined;

            password != undefined ? password_cryptografado = await cruptografar_password(password) : "";


            const update = await knex_Database("tb_users").where("id_user", id).update({

                name: name,
                surname: surname,
                email: email,
                password: password_cryptografado

            }).then(resp => {
                return resp;
            })


            if(update != 0){

                return Response.status(200).json({ status: true, result: "Data update" });

            } else{

                return Response.status(200).json({ status: false, result: "User not found" });
            }

            
        } catch (error) {
            
            return Response.status(500).json({ errors: error })
        }
    },

    delete_user: async (Request, Response) => {

        try {
            
            const { id } = Request.params;

            const del = await knex_Database("tb_users").where("id_user", id).del();

            if(del != 0){

                return Response.status(200).json({ status: true, user_deletado: del })

            } else{

                return Response.status(200).json({ status: false, user_deletado: "user not found" })
            }
            
        } catch (error) {
            
            return Response.status(500).json( { erros: error } );
        }
    }
}