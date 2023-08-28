import { createTag } from '../../scripts/scripts.js';

function openLink(e) {
  const idName = e.target.getAttribute('title');
  let url = null;
  const currentUrl = window.location.href;
  if (idName !== null) {
    if (idName.includes('linkedin')) {
      url = `https://www.linkedin.com/sharing/share-offsite/?url= ${currentUrl}`;
      window.open(url, '_blank', 'toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=300,width=800,height=500');
    } else if (idName.includes('twitter')) {
      url = `https://twitter.com/share?url= ${currentUrl}`;
      window.open(url, '_blank', 'toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=300,width=800,height=500');
    } else if (idName.includes('facebook')) {
      url = `https://www.facebook.com/sharer/sharer.php?u= ${currentUrl}`;
      window.open(url, '_blank', 'toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=300,width=800,height=500');
    } else if (idName.includes('share')) {
      navigator.clipboard.writeText(window.location.href);
    }
  }
  e.preventDefault();
}

const sections = [];

function anchorTagLinkCreation(contentLinkId, contentLink) {
  const aLink = document.createElement('a');
  aLink.append(contentLink);
  aLink.classList.add('content-link');
  aLink.href = `#${contentLinkId}`;
  document.getElementById('blog-content-link').append(aLink);
  document.getElementsByClassName('content-link')[0].classList.add('active');
  document.getElementById(contentLinkId).classList.add('scroll-margin');
  sections.push(document.getElementById(contentLinkId));
  window.addEventListener('scroll', () => {
    const scrollAmount = window.scrollY;
    sections.forEach((element) => {
      if (scrollAmount >= ((element.offsetTop) - 130)) {
        const idName = element.getAttribute('id');
        if (idName === contentLinkId) {
          aLink.classList.add('active');
        } else {
          aLink.classList.remove('active');
        }
      }
    });
  });
}

function anchorTagSocialMediaCreation(socialMedia) {
  const clsName = `social-share-${socialMedia}`;
  // const sid = `social_share_link${socialMedia}`;
  const aLink = document.createElement('a');
  aLink.setAttribute('class', clsName);
  // aLink.setAttribute('id', sid);
  aLink.title = socialMedia;
  aLink.href = '#';
  aLink.addEventListener('click', openLink);
  return aLink;
}

export default function decorate(block) {
 const social = document.querySelector('main');
 const socialLinks = ['linkedin', 'twitter', 'facebook', 'share'];
 const socialShareLinks = createTag('div', { class: 'social-share-links' });
 socialShareLinks.setAttribute('id', 'social-share-links-id');

 socialLinks.forEach((item) => {
   socialShareLinks.append(anchorTagSocialMediaCreation(item));
 });
 block.append(social);
 social.append(socialShareLinks);
}