/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import * as React from 'react';
import Image from 'next/image';
import {IconTwitter} from '../Icon/IconTwitter';
import {IconThreads} from '../Icon/IconThreads';
import {IconGitHub} from '../Icon/IconGitHub';
import {ExternalLink} from '../ExternalLink';
import {H3} from './Heading';
import {IconLink} from 'components/Icon/IconLink';
import Link from './Link';

interface TeamMemberProps {
  name: string;
  id: string;
  title: string;
  permalink: string;
  children: React.ReactNode;
  photo: string;
  twitter?: string;
  threads?: string;
  github?: string;
  personal?: string;
  translated?: {title: string; translatedTitle?: string; url: string}[];
}

// TODO: good alt text for images/links
export function TeamMember({
  name,
  title,
  children,
  photo,
  github,
  twitter,
  threads,
  personal,
  translated,
}: TeamMemberProps) {
  if (name == null || title == null || children == null) {
    throw new Error(
      'Expected name, title, and children for ' + name ?? title ?? 'unknown'
    );
  }
  return (
    <div className="pb-6 sm:pb-10">
      <div className="flex flex-col sm:flex-row height-auto">
        <div
          className="hidden sm:block basis-2/5 rounded overflow-hidden relative"
          style={{width: 300, height: 250}}>
          <Image src={photo} layout="fill" objectFit="cover" alt={name} />
        </div>
        <div
          style={{minHeight: 300}}
          className="block w-full sm:hidden flex-grow basis-2/5 rounded overflow-hidden relative">
          <Image src={photo} layout="fill" objectFit="cover" alt={name} />
        </div>
        <div className="ps-0 sm:ps-6 basis-3/5 items-start">
          <H3 className="mb-1 sm:my-0" id={name}>
            {name}
          </H3>
          {title && <div>{title}</div>}
          {children}
          <div className="sm:flex sm:flex-row flex-wrap">
            {twitter && (
              <div className="me-4">
                <ExternalLink
                  aria-label="React on Twitter"
                  href={`https://twitter.com/${twitter}`}
                  className="hover:text-primary hover:underline dark:text-primary-dark flex flex-row items-center">
                  <IconTwitter className="pe-1" />
                  {twitter}
                </ExternalLink>
              </div>
            )}
            {threads && (
              <div className="me-4">
                <ExternalLink
                  aria-label="React on Threads"
                  href={`https://threads.net/${threads}`}
                  className="hover:text-primary hover:underline dark:text-primary-dark flex flex-row items-center">
                  <IconThreads className="pe-1" />
                  {threads}
                </ExternalLink>
              </div>
            )}
            {github && (
              <div className="me-4">
                <ExternalLink
                  aria-label="GitHub Profile"
                  href={`https://github.com/${github}`}
                  className="hover:text-primary hover:underline dark:text-primary-dark flex flex-row items-center">
                  <IconGitHub className="pe-1" /> {github}
                </ExternalLink>
              </div>
            )}
            {personal && (
              <ExternalLink
                aria-label="Personal Site"
                href={`https://${personal}`}
                className="hover:text-primary hover:underline dark:text-primary-dark flex flex-row items-center">
                <IconLink className="pe-1" /> {personal}
              </ExternalLink>
            )}
          </div>
          {translated?.length && (
            <details className="mt-4 translated-list">
              <summary>
                번역한 페이지 <small>({translated?.length})</small>
              </summary>
              <ul className="bg-card dark:bg-card-dark">
                {translated.map(({title, translatedTitle, url}) => (
                  <li key={title}>
                    <Link href={url}>{translatedTitle || title}</Link>
                  </li>
                ))}
              </ul>
            </details>
          )}
        </div>
      </div>
    </div>
  );
}
