if (!Cookies.get('agreement'))
	setTimeout(showCookieConsent, 1000);
else if (Cookies.get('agreement') == '1')
	initCounter();

(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

function showCookieConsent () {
	const consent = document.getElementById('agreementConsent');
	consent.classList.add('show');
}

function hideMessage() {
	const consent = document.getElementById('agreementConsent');
	consent.classList.add('hiding');
	setTimeout(() => {
		consent.classList.remove('show', 'hiding');
	}, 300);
}

function saveYesAnswer()
{
	hideMessage();
	Cookies.set('agreement', '1');
}

function saveNoAnswer()
{
	hideMessage();
	Cookies.set('agreement', '0');
}

function initCounter ()
{
	ym(52735531, "init", {
		clickmap:true,
		trackLinks:true,
		accurateTrackBounce:true
	});
	saveYesAnswer();
}