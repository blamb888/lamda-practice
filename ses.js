require('dotenv').config();
const AWS = require('aws-sdk');
const SES = new AWS.SES({apiVersion: '2010-12-01'});

// Be sure to change this variables value once testing is done
const SES_FROM_EMAIL_ADDRESS = process.env.SES_FROM_EMAIL_ADDRESS;

function sendEmailToCustomer(customer_email) {

    const emailParams = {
        Source: SES_FROM_EMAIL_ADDRESS,
        // ReplyToAddresses: [SES_FROM_EMAIL_ADDRESS],
        Destination: {
          ToAddresses: [customer_email],
        },
        Message: {
          Body: {
            Html: {
              Charset: 'UTF-8',
              Data: `<h1>Thanks for your message:</h1> ${customer_email}\n\n
              <h3>I will reply as soon as possible\n Cheers, \n -- Brandon</h3>
              ${email_template}`,
              // TODO Insert HTML for pages/unsubscribe-success.liquid here ^
            },
          },
          Subject: {
            Charset: 'UTF-8',
            Data: 'メール配信停止のご依頼を承りました',
          },
        },
    };

    console.log(emailParams)

    const sendPromise =  SES.sendEmail(emailParams).promise();
    console.log(sendPromise);

    sendPromise.then(
      function(data) {
        console.log(data.MessageId);
      }).catch(
        function(err) {
        console.error(err, err.stack);
      });
}

module.exports = {
  sendEmailToCustomer
}

const email_template =
`<html>
<div id="unsubscribe_success_wrapper" class="form form--default form--login form--small">
  <form method="#" action="#" id="#" accept-charset="UTF-8">
    <div class="form__head">
      <h3 class="form__title">
        配信停止の
      <br>
        ご依頼を承りました
      </h3>
      <p id="form__description">
        システムにリクエストが処理されるまでに時間がかかる場合がございます。3～4日たってもメールが届く場合には、<a href="https://support.zenb.jp/hc/ja/requests/new">ZENBお客様センター</a>までお問い合わせください。
      </p>
      <!-- /.form__title /.form__description -->
      <div class="form__body">
        <div class="form__row">
          <ul>
            <li class="form__label">
              <div class="list_item">
                <div id="list_description_one" class="list_description">
                  <h5>&nbsp;&nbsp;「お知らせメール」は、いつでも再開可能</h5>
                  <p>
                    再開ご希望の場合は、<a href="https://zenb.jp/account/login?return_url=%2Faccount">「マイアカウント」画面より</a>お知らせメールの設定を変更するだけです。
                  </p>
                </div>
              </div>
            </li>
            <li class="form__label">
              <div class="list_item">
                <div class="list_description">
                  <a href="https://zenb.jp"><h6>ZENBのTOPページを見る</h6></a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- /.form__body -->
    </div>
  </form>
</div>
<!-- Zenb Unsubscribe Footer: -->
  <!-- /.form__footer -->
<div class="unsubscribe_footer">
  <ul class="unsubscribe_bottom_links">
    <li><a href="https://zenb.jp/pages/about">ZENBについて</a></li>
    <li>&nbsp;|&nbsp;</li>
    <li><a href="https://zenb.jp/collections/all">商品一覧</a></li>
    <li>&nbsp;|&nbsp;</li>
    <li><a href="https://zenb.jp/pages/corporate">会社概要</a></li>
    <br>
    <li><a href="https://zenb.jp/pages/privacypolicy">プライバシーポリシー</a></li>
    <li>&nbsp;|&nbsp;</li>
    <li><a href="https://zenb.jp/pages/law">特定商取引法に基づく表示</a></li>
  </ul>
</div>
<!-- /.form__footer -->
</html>

<style>
/* ------------------------------------------------------------ *
  Page  Unsubscribe Success
* ------------------------------------------------------------ */

.form--small {
	max-width: 676px;
	margin: 0 auto 40px;

	&:last-child {
		margin-bottom: 0;
	}
}

.form--default {
	.form__errors {
		font-size: 16px;
		color: #d60808;

		ul {
			list-style: none;
			list-style-position: outside;
			margin: 0 0 20px 0;
		}
	}

	.form__title {
		text-align: center;
		font-size: 32px;
    line-height: 1.6;
    letter-spacing: 0.015em;
    display: inline-block;
    margin: 0;
    color: #004727;
    border-bottom: 4px solid #004727;
    font-weight: 500;
    letter-spacing: 0.1em;
	}

	.form__head {
		text-align: center;
		margin-top: 40px;
		margin-bottom: 80px;

		@media (max-width: 767px) {
			margin-top: 10px;
		}
	}

	.form__description {
		padding: 40px 10% 0;
		font-size: 16px;
		line-height: 1.75;
		color: #777;
		text-align: center;
	}

	.form__label {
		color: #004727;
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 18px;
    letter-spacing: -0.06em;
	}

	.form__actions {
		text-align: center;
		font-size: 18px;
    font-weight: 500;
	}

	.form__btn {
		margin: 5px;
		background-color: #004727;
		color: #fff;
	}

	.form__empty {
		text-align: right;

		h2 {
			padding-bottom: 50px;
			border-bottom: 1px solid #eee;
			margin-bottom: 50px;
		}

		p {
			color: #777;
			margin-bottom: 35px;
		}
	}

	/* Modifiers */
	&.form--login {
		.form__btn {
			border: 0;
    	width: auto;
    	min-width: 440px;
			margin: 0 0 40px;
		}
	}

	&.form--guest {
		padding: 30px 0;
	}

	&.form--recover,
	&.form--register {
		.form__actions {
			text-align: center;
		}

		.form__btn {
			border: 0;
    	width: auto;
    	min-width: 440px;
			margin: 0 0 40px;
		}
	}

	&.form--recover {
		display: none;
	}

	&.form--contact {
		.form__head {
			padding-bottom: 80px;
			border-bottom: 1px solid #eee;
		}

		.form__description {
			text-align: left;
		}

		.form__label {
			display: none;
		}

		.form__body,
		.form__actions {
			padding: 0 10%;
		}
	}

#unsubscribe_success_wrapper {
  margin-top: 60px;
  ul {
    margin-left: 0px;
    list-style: none;
  }
  a {
    text-decoration: underline;
  }
  .form__head {
    margin-bottom: 40px;
      h3 {
      font-size: 28px;
      font-weight: 900;
      border-bottom: none;
      margin: 0px 8px;
      text-align: center;
    }
    #form__description {
      letter-spacing: .1em;
      line-height: 25px;
      font-size: 18px;
      padding: 0px 16px 0px 18px;
      margin-top: 24px;
      font-weight: 400;
      text-align: left;
    }
  }

  .form__body {
    .form__label {
      margin-bottom: 0px;
      .list_item {
        margin-top: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      #list_description_one {
        background-color: #f7f7f7;
        p {
          line-height: 1.3em;
        }
      }
      .list_description {
        width: 100%;
        padding: 16px 12px 12px 12px;
        h5 {
          font-size: 16px;
          font-weight: 800;
          color: black !important;
        }
        p {
          margin-top: 16px;
          font-size: 16px;
          font-weight: 300;
          color: black;
          text-align: left;
        }
      }
    }
  }

  .form__label {
    .list_description{
      h6 {
        font-size: 18px;
        font-weight: 300;
        color: black !important;
        line-height: 1.6rem;
      }
    }
  }

}

.unsubscribe_footer {
  width: 94%;
  margin: 24px auto;
  border-top: 1px solid gray;
  text-align: center;
  line-height: 1.3em;
  font-size: 18px;
  color: gray;
  ul {
    margin: 24px auto;
    width: 96%;
    li {
      display: inline-block;
      a:hover {
        color: darkgray;
      }
    }
  }
}
</style>

`;
