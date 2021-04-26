const chikyu = require('./lib/chikyu');

// ここにログイン用のトークンネームをユーザー側で好きな文字列を設定します。
// 以下は例なのでそのまま使用しないでください。
token_name = 'nodejssdk_login001';
// ここにちきゅうにログインできるログインユーザーID(メールアドレス)
email = 'こちらを設定してください';
// その時のパスワード
password = 'こちらを設定してください';

// コンソールなどで、「node get_login.js」と、nodeで、このファイルを実行することにより、
// 以下が実行されて、ログインするためのtokenとsecret_tokenがリターンされますので、
// 上記に設定したtoken_nameと、リターンされたtokenとsecret_tokenを設定してご使用ください。
// 別ファイルのtest.jsに、トークン設定例を示します。
chikyu.token.create(token_name, email, password).then((r) => {
   console.log(r);
}).catch((e) => {
   console.log(e);
});
