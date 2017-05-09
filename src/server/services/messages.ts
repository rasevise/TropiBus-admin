import * as express from 'express';
import * as db from '../db/pg';

export function messages(app: express.Application) {

  let _messagesURL = '/messages';

  app.get(_messagesURL, (req, res, next) => {
    console.log('inside message get');
    res.contentType('application/json');
    db.query('SELECT * FROM Message', null, (err:any, result:any) => {
      if (err) {
          return console.error('error running query', err);
      }
      res.json(result.rows);
    });
  });

//fix when admin is created by login
app.post(_messagesURL + '/addMessage', (req, res, next) => {

  var a_id = 2;
  var dt = new Date();
  var m_date = dt.toUTCString();
  db.query('INSERT INTO Message(message_text, message_date, admin_id, message_title) VALUES($1, $2, $3, $4)', [req.body.messageContent,m_date,a_id,req.body.title], (err:any, result:any) => {
    if(err) {
      return console.error('error ', err);
    }
    res.send(result);
  });

});

app.put(_messagesURL + '/updateMessage', (req, res, next) => {

    console.log("edit id:" + req.body.id);
    //compare with .compareSync(req.body.data.attributes.password, storedPW)
    db.query('UPDATE Message SET message_title = $2, message_text = $3  WHERE message_id = $1', [req.body.id, req.body.title, req.body.messageContent], (err:any, result:any) => {
      if (err) {
        return console.error('error running query', err);
      }
      res.send(result);
    });
  });


app.delete(_messagesURL + '/deleteMessage', (req, res, next) => {
  var deleteID = parseInt(req.params.id);
  console.log('id:' + req.query.id);
    db.query('DELETE FROM Message WHERE message_id = $1',[req.query.id], (err:any, result:any) => {

      if (err) {
        return console.error('error running query', err);
      }
      res.send(result);
    });
  });

}
